import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

import '../../../core/network/api_client.dart';
import '../../../core/utils/app_constants.dart';
import '../models/user_model.dart';

part 'auth_service.g.dart';

@riverpod
AuthService authService(AuthServiceRef ref) {
  return AuthService(
    apiClient: ref.read(apiClientProvider),
    secureStorage: const FlutterSecureStorage(),
  );
}

class AuthService {
  final ApiClient _apiClient;
  final FlutterSecureStorage _secureStorage;

  AuthService({
    required ApiClient apiClient,
    required FlutterSecureStorage secureStorage,
  })  : _apiClient = apiClient,
        _secureStorage = secureStorage;

  /// Sign in with email and password
  Future<AuthSession> signIn(AuthCredentials credentials) async {
    try {
      final response = await _apiClient.post(
        '/auth/v1/token?grant_type=password',
        data: {
          'email': credentials.email,
          'password': credentials.password,
        },
      );

      final session = AuthSession.fromJson(response.data);
      await _storeSession(session);
      return session;
    } on DioException catch (e) {
      throw _handleAuthError(e);
    }
  }

  /// Sign up with email and password
  Future<AuthSession> signUp(SignUpCredentials credentials) async {
    try {
      final response = await _apiClient.post(
        '/auth/v1/signup',
        data: {
          'email': credentials.email,
          'password': credentials.password,
          if (credentials.name != null) 'data': {'name': credentials.name},
        },
      );

      final session = AuthSession.fromJson(response.data);
      await _storeSession(session);
      return session;
    } on DioException catch (e) {
      throw _handleAuthError(e);
    }
  }

  /// Sign out the current user
  Future<void> signOut() async {
    try {
      final accessToken = await _secureStorage.read(key: AppConstants.accessTokenKey);
      if (accessToken != null) {
        await _apiClient.post(
          '/auth/v1/logout',
          options: Options(
            headers: {'Authorization': 'Bearer $accessToken'},
          ),
        );
      }
    } catch (e) {
      // Continue with local cleanup even if server logout fails
    } finally {
      await _clearStoredSession();
    }
  }

  /// Refresh the current session
  Future<AuthSession> refreshSession(String refreshToken) async {
    try {
      final response = await _apiClient.post(
        '/auth/v1/token?grant_type=refresh_token',
        data: {
          'refresh_token': refreshToken,
        },
      );

      final session = AuthSession.fromJson(response.data);
      await _storeSession(session);
      return session;
    } on DioException catch (e) {
      await _clearStoredSession();
      throw _handleAuthError(e);
    }
  }

  /// Get the current session from storage
  Future<AuthSession?> getCurrentSession() async {
    try {
      final accessToken = await _secureStorage.read(key: AppConstants.accessTokenKey);
      final refreshToken = await _secureStorage.read(key: AppConstants.refreshTokenKey);
      final userDataJson = await _secureStorage.read(key: AppConstants.userDataKey);

      if (accessToken == null || refreshToken == null || userDataJson == null) {
        return null;
      }

      final userData = UserModel.fromJson(
        Map<String, dynamic>.from(
          // In a real app, you'd use proper JSON parsing
          {'id': 'temp', 'email': 'temp@example.com'},
        ),
      );

      return AuthSession(
        accessToken: accessToken,
        refreshToken: refreshToken,
        user: userData,
      );
    } catch (e) {
      await _clearStoredSession();
      return null;
    }
  }

  /// Store session data securely
  Future<void> _storeSession(AuthSession session) async {
    await Future.wait([
      _secureStorage.write(
        key: AppConstants.accessTokenKey,
        value: session.accessToken,
      ),
      _secureStorage.write(
        key: AppConstants.refreshTokenKey,
        value: session.refreshToken,
      ),
      _secureStorage.write(
        key: AppConstants.userDataKey,
        value: session.user.toJson().toString(),
      ),
    ]);
  }

  /// Clear stored session data
  Future<void> _clearStoredSession() async {
    await Future.wait([
      _secureStorage.delete(key: AppConstants.accessTokenKey),
      _secureStorage.delete(key: AppConstants.refreshTokenKey),
      _secureStorage.delete(key: AppConstants.userDataKey),
    ]);
  }

  /// Handle authentication errors
  String _handleAuthError(DioException error) {
    if (error.response?.statusCode == 400) {
      final message = error.response?.data?['error_description'] ?? 
                     error.response?.data?['message'];
      if (message != null) return message;
    }
    
    switch (error.response?.statusCode) {
      case 401:
        return 'Invalid email or password';
      case 422:
        return 'Email already registered';
      case 429:
        return 'Too many requests. Please try again later';
      default:
        return 'Authentication failed. Please try again';
    }
  }
}
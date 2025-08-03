import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

import '../utils/app_constants.dart';

part 'api_client.g.dart';

@riverpod
ApiClient apiClient(ApiClientRef ref) {
  return ApiClient();
}

class ApiClient {
  late final Dio _dio;
  final FlutterSecureStorage _secureStorage = const FlutterSecureStorage();

  ApiClient() {
    _dio = Dio(
      BaseOptions(
        baseUrl: AppConstants.baseUrl,
        connectTimeout: const Duration(seconds: 30),
        receiveTimeout: const Duration(seconds: 30),
        headers: {
          'Content-Type': 'application/json',
          'apikey': AppConstants.supabaseAnonKey,
        },
      ),
    );

    _setupInterceptors();
  }

  void _setupInterceptors() {
    // Request interceptor to add auth token
    _dio.interceptors.add(
      InterceptorsWrapper(
        onRequest: (options, handler) async {
          final token = await _secureStorage.read(key: AppConstants.accessTokenKey);
          if (token != null) {
            options.headers['Authorization'] = 'Bearer $token';
          }
          handler.next(options);
        },
        onError: (error, handler) async {
          // Handle token refresh on 401
          if (error.response?.statusCode == 401) {
            final refreshToken = await _secureStorage.read(key: AppConstants.refreshTokenKey);
            if (refreshToken != null) {
              try {
                final newTokens = await _refreshToken(refreshToken);
                
                // Retry the original request with new token
                final options = error.requestOptions;
                options.headers['Authorization'] = 'Bearer ${newTokens['access_token']}';
                
                final response = await _dio.fetch(options);
                handler.resolve(response);
                return;
              } catch (e) {
                // Refresh failed, clear tokens
                await _clearTokens();
              }
            }
          }
          handler.next(error);
        },
      ),
    );

    // Logging interceptor for development
    _dio.interceptors.add(
      LogInterceptor(
        requestBody: true,
        responseBody: true,
        logPrint: (object) {
          // Only log in debug mode
          assert(() {
            print(object);
            return true;
          }());
        },
      ),
    );
  }

  Future<Map<String, dynamic>> _refreshToken(String refreshToken) async {
    final response = await _dio.post(
      '/auth/v1/token?grant_type=refresh_token',
      data: {'refresh_token': refreshToken},
      options: Options(
        headers: {'Authorization': null}, // Don't include old token
      ),
    );

    final newAccessToken = response.data['access_token'];
    final newRefreshToken = response.data['refresh_token'];

    // Store new tokens
    await Future.wait([
      _secureStorage.write(key: AppConstants.accessTokenKey, value: newAccessToken),
      _secureStorage.write(key: AppConstants.refreshTokenKey, value: newRefreshToken),
    ]);

    return response.data;
  }

  Future<void> _clearTokens() async {
    await Future.wait([
      _secureStorage.delete(key: AppConstants.accessTokenKey),
      _secureStorage.delete(key: AppConstants.refreshTokenKey),
      _secureStorage.delete(key: AppConstants.userDataKey),
    ]);
  }

  // HTTP Methods
  Future<Response> get(String path, {Map<String, dynamic>? queryParameters}) {
    return _dio.get(path, queryParameters: queryParameters);
  }

  Future<Response> post(String path, {dynamic data, Options? options}) {
    return _dio.post(path, data: data, options: options);
  }

  Future<Response> put(String path, {dynamic data}) {
    return _dio.put(path, data: data);
  }

  Future<Response> delete(String path) {
    return _dio.delete(path);
  }

  Future<Response> patch(String path, {dynamic data}) {
    return _dio.patch(path, data: data);
  }
}
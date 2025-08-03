import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

import '../models/user_model.dart';
import '../services/auth_service.dart';

part 'auth_provider.g.dart';

@freezed
class AuthState with _$AuthState {
  const factory AuthState({
    UserModel? user,
    AuthSession? session,
    @Default(false) bool isLoading,
    @Default(false) bool isAuthenticated,
    String? error,
  }) = _AuthState;
}

@riverpod
class AuthNotifier extends _$AuthNotifier {
  @override
  AuthState build() {
    _initializeAuth();
    return const AuthState();
  }

  AuthService get _authService => ref.read(authServiceProvider);

  Future<void> _initializeAuth() async {
    state = state.copyWith(isLoading: true);
    
    try {
      final session = await _authService.getCurrentSession();
      if (session != null) {
        state = state.copyWith(
          session: session,
          user: session.user,
          isAuthenticated: true,
          isLoading: false,
        );
      } else {
        state = state.copyWith(isLoading: false);
      }
    } catch (e) {
      state = state.copyWith(
        error: e.toString(),
        isLoading: false,
      );
    }
  }

  Future<void> signIn(String email, String password) async {
    state = state.copyWith(isLoading: true, error: null);
    
    try {
      final credentials = AuthCredentials(email: email, password: password);
      final session = await _authService.signIn(credentials);
      
      state = state.copyWith(
        session: session,
        user: session.user,
        isAuthenticated: true,
        isLoading: false,
      );
    } catch (e) {
      state = state.copyWith(
        error: e.toString(),
        isLoading: false,
      );
      rethrow;
    }
  }

  Future<void> signUp(String email, String password, {String? name}) async {
    state = state.copyWith(isLoading: true, error: null);
    
    try {
      final credentials = SignUpCredentials(
        email: email,
        password: password,
        name: name,
      );
      final session = await _authService.signUp(credentials);
      
      state = state.copyWith(
        session: session,
        user: session.user,
        isAuthenticated: true,
        isLoading: false,
      );
    } catch (e) {
      state = state.copyWith(
        error: e.toString(),
        isLoading: false,
      );
      rethrow;
    }
  }

  Future<void> signOut() async {
    state = state.copyWith(isLoading: true);
    
    try {
      await _authService.signOut();
      state = const AuthState();
    } catch (e) {
      state = state.copyWith(
        error: e.toString(),
        isLoading: false,
      );
    }
  }

  Future<void> refreshSession() async {
    if (state.session?.refreshToken == null) return;
    
    try {
      final newSession = await _authService.refreshSession(
        state.session!.refreshToken,
      );
      
      state = state.copyWith(
        session: newSession,
        user: newSession.user,
      );
    } catch (e) {
      // If refresh fails, sign out the user
      await signOut();
    }
  }

  void clearError() {
    state = state.copyWith(error: null);
  }
}

// Convenience providers
@riverpod
UserModel? currentUser(CurrentUserRef ref) {
  return ref.watch(authNotifierProvider).user;
}

@riverpod
bool isAuthenticated(IsAuthenticatedRef ref) {
  return ref.watch(authNotifierProvider).isAuthenticated;
}

@riverpod
bool isAuthLoading(IsAuthLoadingRef ref) {
  return ref.watch(authNotifierProvider).isLoading;
}
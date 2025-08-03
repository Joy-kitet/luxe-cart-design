import 'package:freezed_annotation/freezed_annotation.dart';

part 'user_model.freezed.dart';
part 'user_model.g.dart';

@freezed
class UserModel with _$UserModel {
  const factory UserModel({
    required String id,
    required String email,
    String? name,
    String? avatarUrl,
    @JsonKey(name: 'created_at') DateTime? createdAt,
    @JsonKey(name: 'updated_at') DateTime? updatedAt,
    @Default(false) bool emailConfirmed,
    Map<String, dynamic>? metadata,
  }) = _UserModel;

  factory UserModel.fromJson(Map<String, dynamic> json) =>
      _$UserModelFromJson(json);
}

@freezed
class AuthSession with _$AuthSession {
  const factory AuthSession({
    required String accessToken,
    required String refreshToken,
    required UserModel user,
    @JsonKey(name: 'expires_at') DateTime? expiresAt,
    @JsonKey(name: 'token_type') @Default('Bearer') String tokenType,
  }) = _AuthSession;

  factory AuthSession.fromJson(Map<String, dynamic> json) =>
      _$AuthSessionFromJson(json);
}

@freezed
class AuthCredentials with _$AuthCredentials {
  const factory AuthCredentials({
    required String email,
    required String password,
  }) = _AuthCredentials;

  factory AuthCredentials.fromJson(Map<String, dynamic> json) =>
      _$AuthCredentialsFromJson(json);
}

@freezed
class SignUpCredentials with _$SignUpCredentials {
  const factory SignUpCredentials({
    required String email,
    required String password,
    String? name,
    Map<String, dynamic>? metadata,
  }) = _SignUpCredentials;

  factory SignUpCredentials.fromJson(Map<String, dynamic> json) =>
      _$SignUpCredentialsFromJson(json);
}
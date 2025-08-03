class AppConstants {
  static const String appName = 'LuxeCart';
  static const String appDescription = 'Premium Shopping Experience';
  
  // API Configuration
  static const String baseUrl = 'https://nkldjecnefduwmseyyih.supabase.co';
  static const String supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5rbGRqZWNuZWZkdXdtc2V5eWloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyMjQwNjMsImV4cCI6MjA2OTgwMDA2M30.RVLRvO3hlAKxnzi_iz5qyklbzOwz-U-GprN__bA_3dQ';
  
  // Storage Keys
  static const String accessTokenKey = 'access_token';
  static const String refreshTokenKey = 'refresh_token';
  static const String userDataKey = 'user_data';
  
  // Animation Durations
  static const Duration shortAnimation = Duration(milliseconds: 300);
  static const Duration mediumAnimation = Duration(milliseconds: 600);
  static const Duration longAnimation = Duration(milliseconds: 1000);
  
  // UI Constants
  static const double defaultPadding = 16.0;
  static const double smallPadding = 8.0;
  static const double largePadding = 24.0;
  static const double borderRadius = 12.0;
  static const double cardElevation = 4.0;
}
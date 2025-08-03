import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTheme {
  // Luxury Color Palette (matching the CSS variables)
  static const Color primaryGold = Color(0xFFFFD700); // hsl(45 100% 70%)
  static const Color primaryGoldGlow = Color(0xFFFFE55C); // hsl(45 100% 80%)
  static const Color backgroundDark = Color(0xFF0D0D0D); // hsl(0 0% 5%)
  static const Color cardDark = Color(0xFF141414); // hsl(0 0% 8%)
  static const Color secondaryDark = Color(0xFF1F1F1F); // hsl(0 0% 12%)
  static const Color borderColor = Color(0xFF333333); // hsl(45 30% 20%)
  static const Color mutedForeground = Color(0xFFA6A6A6); // hsl(45 20% 65%)
  static const Color foregroundLight = Color(0xFFF5F5DC); // hsl(45 100% 96%)

  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.light,
      primaryColor: primaryGold,
      scaffoldBackgroundColor: Colors.grey[50],
      textTheme: _textTheme,
      appBarTheme: _appBarTheme(Brightness.light),
      elevatedButtonTheme: _elevatedButtonTheme,
      cardTheme: _cardTheme(Brightness.light),
      inputDecorationTheme: _inputDecorationTheme(Brightness.light),
    );
  }

  static ThemeData get darkTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      primaryColor: primaryGold,
      scaffoldBackgroundColor: backgroundDark,
      cardColor: cardDark,
      textTheme: _textTheme,
      appBarTheme: _appBarTheme(Brightness.dark),
      elevatedButtonTheme: _elevatedButtonTheme,
      cardTheme: _cardTheme(Brightness.dark),
      inputDecorationTheme: _inputDecorationTheme(Brightness.dark),
      colorScheme: const ColorScheme.dark(
        primary: primaryGold,
        secondary: primaryGoldGlow,
        surface: cardDark,
        background: backgroundDark,
        onPrimary: backgroundDark,
        onSecondary: backgroundDark,
        onSurface: foregroundLight,
        onBackground: foregroundLight,
      ),
    );
  }

  static TextTheme get _textTheme {
    return TextTheme(
      // Display fonts using Playfair Display
      displayLarge: GoogleFonts.playfairDisplay(
        fontSize: 32,
        fontWeight: FontWeight.bold,
        color: foregroundLight,
      ),
      displayMedium: GoogleFonts.playfairDisplay(
        fontSize: 28,
        fontWeight: FontWeight.bold,
        color: foregroundLight,
      ),
      displaySmall: GoogleFonts.playfairDisplay(
        fontSize: 24,
        fontWeight: FontWeight.w600,
        color: foregroundLight,
      ),
      
      // Headlines using Playfair Display
      headlineLarge: GoogleFonts.playfairDisplay(
        fontSize: 22,
        fontWeight: FontWeight.w600,
        color: foregroundLight,
      ),
      headlineMedium: GoogleFonts.playfairDisplay(
        fontSize: 20,
        fontWeight: FontWeight.w600,
        color: foregroundLight,
      ),
      headlineSmall: GoogleFonts.playfairDisplay(
        fontSize: 18,
        fontWeight: FontWeight.w500,
        color: foregroundLight,
      ),
      
      // Body text using Open Sans
      bodyLarge: GoogleFonts.openSans(
        fontSize: 16,
        fontWeight: FontWeight.normal,
        color: foregroundLight,
      ),
      bodyMedium: GoogleFonts.openSans(
        fontSize: 14,
        fontWeight: FontWeight.normal,
        color: foregroundLight,
      ),
      bodySmall: GoogleFonts.openSans(
        fontSize: 12,
        fontWeight: FontWeight.normal,
        color: mutedForeground,
      ),
      
      // Labels using Open Sans
      labelLarge: GoogleFonts.openSans(
        fontSize: 14,
        fontWeight: FontWeight.w500,
        color: foregroundLight,
      ),
      labelMedium: GoogleFonts.openSans(
        fontSize: 12,
        fontWeight: FontWeight.w500,
        color: foregroundLight,
      ),
      labelSmall: GoogleFonts.openSans(
        fontSize: 10,
        fontWeight: FontWeight.w500,
        color: mutedForeground,
      ),
    );
  }

  static AppBarTheme _appBarTheme(Brightness brightness) {
    return AppBarTheme(
      elevation: 0,
      backgroundColor: brightness == Brightness.dark ? backgroundDark : Colors.white,
      foregroundColor: brightness == Brightness.dark ? foregroundLight : Colors.black,
      titleTextStyle: GoogleFonts.playfairDisplay(
        fontSize: 20,
        fontWeight: FontWeight.bold,
        color: brightness == Brightness.dark ? foregroundLight : Colors.black,
      ),
    );
  }

  static ElevatedButtonThemeData get _elevatedButtonTheme {
    return ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: primaryGold,
        foregroundColor: backgroundDark,
        elevation: 4,
        padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 16),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
        textStyle: GoogleFonts.openSans(
          fontSize: 16,
          fontWeight: FontWeight.w600,
        ),
      ),
    );
  }

  static CardTheme _cardTheme(Brightness brightness) {
    return CardTheme(
      elevation: 4,
      color: brightness == Brightness.dark ? cardDark : Colors.white,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
        side: BorderSide(
          color: brightness == Brightness.dark ? borderColor : Colors.grey[300]!,
          width: 1,
        ),
      ),
    );
  }

  static InputDecorationTheme _inputDecorationTheme(Brightness brightness) {
    return InputDecorationTheme(
      filled: true,
      fillColor: brightness == Brightness.dark ? secondaryDark : Colors.grey[100],
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(12),
        borderSide: BorderSide(
          color: brightness == Brightness.dark ? borderColor : Colors.grey[300]!,
        ),
      ),
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(12),
        borderSide: BorderSide(
          color: brightness == Brightness.dark ? borderColor : Colors.grey[300]!,
        ),
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(12),
        borderSide: const BorderSide(color: primaryGold, width: 2),
      ),
      labelStyle: GoogleFonts.openSans(
        color: brightness == Brightness.dark ? foregroundLight : Colors.black87,
      ),
      hintStyle: GoogleFonts.openSans(
        color: mutedForeground,
      ),
    );
  }
}
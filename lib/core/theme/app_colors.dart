import 'package:flutter/material.dart';

/// App color palette - exact colors from Figma design
class AppColors {
  AppColors._();

  // Background colors (warm, calm palette)
  static const Color background = Color(0xFFFBF8F3); // #FBF8F3
  static const Color foreground = Color(0xFF2B2523); // #2B2523
  
  // Card colors
  static const Color card = Color(0xFFFFFEF9); // #FFFEF9
  static const Color cardForeground = Color(0xFF2B2523);
  
  // Primary colors
  static const Color primary = Color(0xFF2B2523); // Dark brown/black
  static const Color primaryForeground = Color(0xFFFFFEF9); // Cream white
  
  // Secondary colors  
  static const Color secondary = Color(0xFFF5F1EB); // #F5F1EB
  static const Color secondaryForeground = Color(0xFF2B2523);
  
  // Muted colors
  static const Color muted = Color(0xFFE8E3DC); // #E8E3DC
  static const Color mutedForeground = Color(0xFF6B6562); // #6B6562
  
  // Accent
  static const Color accent = Color(0xFFD4EDE4); // Mint green #D4EDE4
  static const Color accentForeground = Color(0xFF2B2523);
  
  // Border
  static const Color border = Color(0x142B2523); // rgba(43, 37, 35, 0.08)
  
  // Season colors
  static const Color seasonSpring = Color(0xFFE8F5E9); // #E8F5E9
  static const Color seasonSummer = Color(0xFFFFF9C4); // #FFF9C4  
  static const Color seasonAutumn = Color(0xFFFFE0B2); // #FFE0B2
  static const Color seasonWinter = Color(0xFFE3F2FD); // #E3F2FD
  
  // Jar colors
  static const Color jarGlass = Color(0x66FFFFFF); // rgba(255, 255, 255, 0.4)
  static const Color jarHighlight = Color(0xCCFFFFFF); // rgba(255, 255, 255, 0.8)
  static const Color jarShadow = Color(0x142B2523); // rgba(43, 37, 35, 0.08)
  static const Color jarLid = Color(0xFFD4D0CA); // #D4D0CA
  
  // Social login colors
  static const Color appleBlack = Color(0xFF000000);
  static const Color googleWhite = Color(0xFFFFFFFF);
  
  // Destructive
  static const Color destructive = Color(0xFFD4183D);
  static const Color destructiveForeground = Color(0xFFFFFFFF);
}

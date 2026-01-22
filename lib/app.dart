import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:memory_jar/core/theme/app_colors.dart';
import 'package:memory_jar/features/splash/splash_page.dart';
import 'package:memory_jar/features/onboarding/onboarding_page.dart';
import 'package:memory_jar/features/auth/login_page.dart';
import 'package:memory_jar/features/home/home_page.dart';
import 'package:memory_jar/features/memory/write_memory_page.dart';

/// Main App Widget
class MemoryJarApp extends ConsumerWidget {
  const MemoryJarApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return MaterialApp(
      title: 'Memory Jar',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.light(
          primary: AppColors.primary,
          secondary: AppColors.secondary,
          surface: AppColors.card,
          error: AppColors.destructive,
        ),
        scaffoldBackgroundColor: AppColors.background,
      ),
      initialRoute: '/',
      routes: {
        '/': (context) => const SplashPage(),
        '/onboarding': (context) => const OnboardingPage(),
        '/login': (context) => const LoginPage(),
        '/home': (context) => const HomePage(),
        '/write-memory': (context) => const WriteMemoryPage(),
      },
    );
  }
}

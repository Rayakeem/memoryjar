import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:memory_jar/core/theme/app_theme.dart';
import 'package:memory_jar/features/jellyfish/jellyfish_home_page.dart';

/// Main App Widget
class MemoryJarApp extends ConsumerWidget {
  const MemoryJarApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return MaterialApp(
      title: 'Memory Jar',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.lightTheme,
      home: const JellyfishHomePage(),
    );
  }
}

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:memory_jar/core/theme/app_colors.dart';
import 'package:memory_jar/shared/widgets/jar_widget.dart';
import 'package:memory_jar/features/jellyfish/jellyfish_stage.dart';
import 'package:memory_jar/features/jellyfish/jellyfish_service.dart';

class HomePage extends ConsumerWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final jellyfishStage = ref.watch(currentJellyfishStageProvider);
    
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        title: const Text(
          'Memory Jar',
          style: TextStyle(
            color: AppColors.foreground,
            fontSize: 18,
            fontWeight: FontWeight.w600,
          ),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.settings_outlined, color: AppColors.foreground),
            onPressed: () {
              // TODO: Navigate to settings
            },
          ),
        ],
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          child: SizedBox(
            height: MediaQuery.of(context).size.height - MediaQuery.of(context).padding.top - MediaQuery.of(context).padding.bottom,
            child: Column(
              children: [
            // Jar and jellyfish
            Expanded(
              child: Stack(
                children: [
                  // Jar in the center
                  Center(
                    child: Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 40),
                      child: const JarWidget(noteCount: 5),
                    ),
                  ),
                  
                  // Jellyfish floating on the left side
                  Positioned(
                    left: 40,
                    top: 60,
                    child: Image.asset(
                      jellyfishStage.assetPath,
                      width: 80,
                      height: 80,
                      fit: BoxFit.contain,
                    ),
                  ),
                ],
              ),
            ),
            
            // Memory count
            Text(
              '5개의 순간이 담겼어요',
              style: TextStyle(
                fontSize: 14,
                color: AppColors.mutedForeground,
              ),
            ),
            
            const SizedBox(height: 24),
            
            // Season icons
            _buildSeasonBar(),
            
            const SizedBox(height: 16),
            
            Text(
              '올해의 흐름을 같이 지나가요.',
              style: TextStyle(
                fontSize: 12,
                color: AppColors.mutedForeground,
              ),
            ),
            
            const SizedBox(height: 32),
            
            // Add memory button
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24),
              child: SizedBox(
                width: double.infinity,
                height: 56,
                child: ElevatedButton(
                  onPressed: () {
                    Navigator.pushNamed(context, '/write-memory');
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppColors.primary,
                    foregroundColor: AppColors.primaryForeground,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(16),
                    ),
                    elevation: 0,
                  ),
                  child: const Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(Icons.add, size: 20),
                      SizedBox(width: 8),
                      Text(
                        '오늘의 해피저금',
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
            
            const SizedBox(height: 16),
            
            Text(
              '행복했던 순간만 짧게 적어도 괜찮아요.',
              style: TextStyle(
                fontSize: 12,
                color: AppColors.mutedForeground,
              ),
            ),
            
            const SizedBox(height: 32),
          ],
        ),
          ),
        ),
      ),
    );
  }

  Widget _buildSeasonBar() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: [
          _buildSeasonIcon('봄', '🌱', AppColors.seasonSpring),
          _buildSeasonIcon('여름', '☀️', AppColors.seasonSummer),
          _buildSeasonIcon('가을', '🍂', AppColors.seasonAutumn),
          _buildSeasonIcon('겨울', '⛄', AppColors.seasonWinter),
        ],
      ),
    );
  }

  Widget _buildSeasonIcon(String label, String emoji, Color bgColor) {
    return Column(
      children: [
        Container(
          width: 56,
          height: 56,
          decoration: BoxDecoration(
            color: bgColor.withValues(alpha: 0.3),
            shape: BoxShape.circle,
          ),
          child: Center(
            child: Text(
              emoji,
              style: const TextStyle(fontSize: 24),
            ),
          ),
        ),
        const SizedBox(height: 6),
        Text(
          label,
          style: const TextStyle(
            fontSize: 12,
            color: AppColors.mutedForeground,
          ),
        ),
      ],
    );
  }
}

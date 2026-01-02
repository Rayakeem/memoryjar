import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:memory_jar/features/jellyfish/jellyfish_service.dart';
import 'package:memory_jar/features/jellyfish/jellyfish_widget.dart';
import 'package:memory_jar/features/jellyfish/jellyfish_speech_bubble.dart';

/// Home Screen with Jellyfish Companion
/// 
/// This is the main screen where users interact with their jellyfish
class JellyfishHomePage extends ConsumerStatefulWidget {
  const JellyfishHomePage({super.key});

  @override
  ConsumerState<JellyfishHomePage> createState() => _JellyfishHomePageState();
}

class _JellyfishHomePageState extends ConsumerState<JellyfishHomePage> {
  bool _showSpeechBubble = false;
  String _currentFact = '';

  void _handleJellyfishTap() {
    // Simple tap - just visual feedback, no functional result
    // The animation is handled by JellyfishWidget itself
  }

  void _handleJellyfishLongPress() {
    setState(() {
      _currentFact = JellyfishFacts.getRandomFact();
      _showSpeechBubble = true;
    });
  }

  void _handleBubbleDismissed() {
    setState(() {
      _showSpeechBubble = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    final currentStage = ref.watch(currentJellyfishStageProvider);

    return Scaffold(
      backgroundColor: const Color(0xFFF5F7FA),
      body: SafeArea(
        child: Stack(
          children: [
            // Main content
            Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Spacer(flex: 2),
                  
                  // Jellyfish
                  JellyfishWidget(
                    stage: currentStage,
                    onTap: _handleJellyfishTap,
                    onLongPress: _handleJellyfishLongPress,
                  ),
                  
                  const SizedBox(height: 40),
                  
                  // Subtle hint text (optional)
                  Text(
                    '해파리를 길게 눌러보세요',
                    style: TextStyle(
                      fontSize: 14,
                      color: Colors.grey[400],
                      letterSpacing: -0.3,
                    ),
                  ),
                  
                  const Spacer(flex: 3),
                ],
              ),
            ),
            
            // Speech bubble overlay
            if (_showSpeechBubble)
              Positioned(
                top: 80,
                left: 0,
                right: 0,
                child: JellyfishSpeechBubble(
                  text: _currentFact,
                  onDismissed: _handleBubbleDismissed,
                ),
              ),
          ],
        ),
      ),
      
      // Bottom navigation or action button
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () {
          // Navigate to moment creation screen
          // TODO: Implement navigation
        },
        backgroundColor: const Color(0xFF6C63FF),
        label: const Text(
          '기록 남기기',
          style: TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.w600,
            color: Colors.white,
          ),
        ),
        icon: const Icon(Icons.add, color: Colors.white),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,
    );
  }
}

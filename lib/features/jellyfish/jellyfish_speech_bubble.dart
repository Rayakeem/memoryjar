import 'package:flutter/material.dart';
import 'dart:math' as math;

/// Speech Bubble Widget for Jellyfish
/// 
/// Displays educational facts about moon jellyfish
/// Automatically appears and disappears (no close button)
class JellyfishSpeechBubble extends StatefulWidget {
  final String text;
  final VoidCallback? onDismissed;

  const JellyfishSpeechBubble({
    super.key,
    required this.text,
    this.onDismissed,
  });

  @override
  State<JellyfishSpeechBubble> createState() => _JellyfishSpeechBubbleState();
}

class _JellyfishSpeechBubbleState extends State<JellyfishSpeechBubble>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _fadeAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 300),
      vsync: this,
    );

    _fadeAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _controller,
      curve: Curves.easeInOut,
    ));

    // Automatically show
    _controller.forward();

    // Automatically dismiss after 8 seconds
    Future.delayed(const Duration(seconds: 8), () {
      if (mounted) {
        _controller.reverse().then((_) {
          widget.onDismissed?.call();
        });
      }
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return FadeTransition(
      opacity: _fadeAnimation,
      child: Container(
        margin: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(20),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.1),
              blurRadius: 20,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              widget.text,
              style: const TextStyle(
                fontSize: 15,
                height: 1.6,
                color: Color(0xFF2C3E50),
                letterSpacing: -0.3,
              ),
              textAlign: TextAlign.left,
            ),
          ],
        ),
      ),
    );
  }
}

/// Jellyfish Fact Provider
/// Contains all educational facts exactly as specified
class JellyfishFacts {
  JellyfishFacts._();

  static final List<String> facts = [
    '''보름달물해파리는 뇌, 심장, 피가 없습니다.
우리 몸의 필수 기관인 뇌, 심장, 혈액, 눈 등이 없고,
몸의 95%가 수분으로 이루어져 있어
'물 주머니'라고 불리기도 합니다.''',
    '''보름달물해파리는 아가미나 폐가 없지만,
얇은 피부를 통해 바닷물 속의 산소를
직접 흡수하여 호흡합니다.''',
    '''투명한 몸속에 보이는 네 개의 말굽 모양,
또는 클로버 모양의 기관은 생식선입니다.
먹이를 먹으면 이 부분이 먹이의 색으로
물들어 더욱 선명해집니다.''',
    '''먹이가 부족하면 에너지를 절약하기 위해
몸 크기를 10분의 1로 줄일 수 있습니다.
다시 먹이가 풍부해지면
원래 크기로 돌아옵니다.''',
    '''보름달물해파리는 약 6억 년 전부터
지구상에 존재해 왔습니다.
공룡보다도 훨씬 오래된
해양 생존자입니다.''',
    '''다른 해파리들과 달리
독성이 매우 약해서
대부분의 사람은 쏘여도
거의 느끼지 못합니다.''',
  ];

  /// Get a random fact
  static String getRandomFact() {
    final random = math.Random();
    return facts[random.nextInt(facts.length)];
  }
}

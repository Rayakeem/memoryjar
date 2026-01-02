import 'package:flutter/material.dart';
import 'package:memory_jar/features/jellyfish/jellyfish_stage.dart';

/// Interactive Jellyfish Widget
/// 
/// Responsibilities:
/// - Display jellyfish image based on stage
/// - Respond to tap (short touch)
/// - Respond to long press (2+ seconds)
/// 
/// This widget only handles presentation and interaction
/// It does NOT calculate growth stages
class JellyfishWidget extends StatefulWidget {
  final JellyfishStage stage;
  final VoidCallback? onTap;
  final VoidCallback? onLongPress;

  const JellyfishWidget({
    super.key,
    required this.stage,
    this.onTap,
    this.onLongPress,
  });

  @override
  State<JellyfishWidget> createState() => _JellyfishWidgetState();
}

class _JellyfishWidgetState extends State<JellyfishWidget>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _scaleAnimation;
  late Animation<double> _rotationAnimation;
  bool _isPressed = false;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 400),
      vsync: this,
    );

    _scaleAnimation = Tween<double>(
      begin: 1.0,
      end: 1.08,
    ).animate(CurvedAnimation(
      parent: _controller,
      curve: Curves.easeInOut,
    ));

    _rotationAnimation = Tween<double>(
      begin: 0,
      end: 0.02, // Slight rotation in radians
    ).animate(CurvedAnimation(
      parent: _controller,
      curve: Curves.easeInOut,
    ));
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _handleTap() {
    if (_isPressed) return; // Prevent tap during long press

    // Animate scale and rotation
    _controller.forward().then((_) {
      _controller.reverse();
    });

    widget.onTap?.call();
  }

  void _handleLongPressStart(LongPressStartDetails details) {
    setState(() {
      _isPressed = true;
    });
    widget.onLongPress?.call();
  }

  void _handleLongPressEnd(LongPressEndDetails details) {
    setState(() {
      _isPressed = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    final screenWidth = MediaQuery.of(context).size.width;
    final baseSize = screenWidth * 0.5; // 50% of screen width
    final actualSize = baseSize * widget.stage.scaleFactor;

    return GestureDetector(
      onTap: _handleTap,
      onLongPressStart: _handleLongPressStart,
      onLongPressEnd: _handleLongPressEnd,
      child: AnimatedBuilder(
        animation: _controller,
        builder: (context, child) {
          return Transform.scale(
            scale: _scaleAnimation.value,
            child: Transform.rotate(
              angle: _rotationAnimation.value,
              child: child,
            ),
          );
        },
        child: SizedBox(
          width: actualSize,
          height: actualSize,
          child: Image.asset(
            widget.stage.assetPath,
            fit: BoxFit.contain,
          ),
        ),
      ),
    );
  }
}

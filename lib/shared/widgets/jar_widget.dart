import 'package:flutter/material.dart';

class JarWidget extends StatelessWidget {
  final int noteCount;
  final double? width;
  final double? height;

  const JarWidget({
    super.key,
    this.noteCount = 0,
    this.width,
    this.height,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: width ?? 280,
      height: height ?? 400,
      child: Image.asset(
        'assets/images/jar/jar1.png',
        fit: BoxFit.contain,
      ),
    );
  }
}

import 'package:flutter/material.dart';
import 'package:memory_jar/core/theme/app_colors.dart';
import 'package:memory_jar/shared/widgets/jar_widget.dart';

class LoginPage extends StatelessWidget {
  const LoginPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 48),
            child: SizedBox(
              height: MediaQuery.of(context).size.height - 96,
              child: Column(
                children: [
                  // Content - Jar and text
                  Expanded(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        // Jar illustration
                        SizedBox(
                          height: 280,
                          child: const JarWidget(noteCount: 0),
                        ),
                        
                        const SizedBox(height: 32),
                        
                        // Title and subtitle
                        const Text(
                          '내 병 만들기',
                          style: TextStyle(
                            fontSize: 24,
                            fontWeight: FontWeight.w600,
                            color: AppColors.foreground,
                          ),
                        ),
                        const SizedBox(height: 8),
                        const Text(
                          '기록은 기기/계정에 안전하게 저장돼요.',
                          style: TextStyle(
                            fontSize: 14,
                            color: AppColors.mutedForeground,
                          ),
                        ),
                      ],
                    ),
                  ),
                  
                  // Login buttons
                  Column(
                    children: [
                      // Apple login button
                      SizedBox(
                        width: double.infinity,
                        height: 56,
                        child: ElevatedButton(
                          onPressed: () {
                            // TODO: Implement Apple Sign In
                            Navigator.pushReplacementNamed(context, '/home');
                          },
                          style: ElevatedButton.styleFrom(
                            backgroundColor: AppColors.appleBlack,
                            foregroundColor: Colors.white,
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(16),
                            ),
                            elevation: 0,
                          ),
                          child: const Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Icon(
                                Icons.apple,
                                size: 20,
                              ),
                              SizedBox(width: 12),
                              Text(
                                'Continue with Apple',
                                style: TextStyle(
                                  fontSize: 16,
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                      
                      const SizedBox(height: 12),
                      
                      // Google login button
                      SizedBox(
                        width: double.infinity,
                        height: 56,
                        child: OutlinedButton(
                          onPressed: () {
                            // TODO: Implement Google Sign In
                            Navigator.pushReplacementNamed(context, '/home');
                          },
                          style: OutlinedButton.styleFrom(
                            backgroundColor: AppColors.googleWhite,
                            foregroundColor: AppColors.foreground,
                            side: const BorderSide(
                              color: AppColors.border,
                              width: 2,
                            ),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(16),
                            ),
                            elevation: 0,
                          ),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              _buildGoogleIcon(),
                              const SizedBox(width: 12),
                              const Text(
                                'Continue with Google',
                                style: TextStyle(
                                  fontSize: 16,
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                      
                      const SizedBox(height: 12),
                      
                      // Email login button
                      TextButton(
                        onPressed: () {
                          // TODO: Implement email auth
                          Navigator.pushReplacementNamed(context, '/home');
                        },
                        style: TextButton.styleFrom(
                          foregroundColor: AppColors.mutedForeground,
                          padding: const EdgeInsets.symmetric(vertical: 12),
                        ),
                        child: const Text(
                          '이메일로 계속하기',
                          style: TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildGoogleIcon() {
    return SizedBox(
      width: 20,
      height: 20,
      child: CustomPaint(
        painter: GoogleIconPainter(),
      ),
    );
  }
}

class GoogleIconPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()..style = PaintingStyle.fill;

    // Blue part
    paint.color = const Color(0xFF4285F4);
    final bluePath = Path();
    bluePath.moveTo(size.width * 0.94, size.height * 0.51);
    bluePath.cubicTo(
      size.width * 0.94, size.height * 0.44,
      size.width * 0.93, size.height * 0.38,
      size.width * 0.92, size.height * 0.34,
    );
    bluePath.lineTo(size.width * 0.5, size.height * 0.34);
    bluePath.lineTo(size.width * 0.5, size.height * 0.52);
    bluePath.lineTo(size.width * 0.75, size.height * 0.52);
    bluePath.cubicTo(
      size.width * 0.74, size.height * 0.58,
      size.width * 0.71, size.height * 0.63,
      size.width * 0.66, size.height * 0.66,
    );
    bluePath.lineTo(size.width * 0.66, size.height * 0.78);
    bluePath.lineTo(size.width * 0.81, size.height * 0.78);
    bluePath.cubicTo(
      size.width * 0.90, size.height * 0.70,
      size.width * 0.94, size.height * 0.61,
      size.width * 0.94, size.height * 0.51,
    );
    canvas.drawPath(bluePath, paint);

    // Green part  
    paint.color = const Color(0xFF34A853);
    final greenPath = Path();
    greenPath.moveTo(size.width * 0.5, size.height * 0.96);
    greenPath.cubicTo(
      size.width * 0.62, size.height * 0.96,
      size.width * 0.73, size.height * 0.92,
      size.width * 0.80, size.height * 0.85,
    );
    greenPath.lineTo(size.width * 0.66, size.height * 0.73);
    greenPath.cubicTo(
      size.width * 0.62, size.height * 0.77,
      size.width * 0.56, size.height * 0.79,
      size.width * 0.50, size.height * 0.79,
    );
    greenPath.cubicTo(
      size.width * 0.38, size.height * 0.79,
      size.width * 0.28, size.height * 0.71,
      size.width * 0.24, size.height * 0.60,
    );
    greenPath.lineTo(size.width * 0.09, size.height * 0.72);
    greenPath.cubicTo(
      size.width * 0.17, size.height * 0.86,
      size.width * 0.32, size.height * 0.96,
      size.width * 0.50, size.height * 0.96,
    );
    canvas.drawPath(greenPath, paint);

    // Yellow part
    paint.color = const Color(0xFFFBBC05);
    final yellowPath = Path();
    yellowPath.moveTo(size.width * 0.24, size.height * 0.59);
    yellowPath.cubicTo(
      size.width * 0.23, size.height * 0.56,
      size.width * 0.23, size.height * 0.53,
      size.width * 0.23, size.height * 0.50,
    );
    yellowPath.cubicTo(
      size.width * 0.23, size.height * 0.47,
      size.width * 0.23, size.height * 0.44,
      size.width * 0.24, size.height * 0.41,
    );
    yellowPath.lineTo(size.width * 0.24, size.height * 0.29);
    yellowPath.lineTo(size.width * 0.09, size.height * 0.29);
    yellowPath.lineTo(size.width * 0.05, size.height * 0.32);
    yellowPath.cubicTo(
      size.width * 0.02, size.height * 0.38,
      size.width * 0.0, size.height * 0.43,
      size.width * 0.0, size.height * 0.50,
    );
    yellowPath.cubicTo(
      size.width * 0.0, size.height * 0.57,
      size.width * 0.02, size.height * 0.64,
      size.width * 0.05, size.height * 0.70,
    );
    canvas.drawPath(yellowPath, paint);

    // Red part
    paint.color = const Color(0xFFEA4335);
    final redPath = Path();
    redPath.moveTo(size.width * 0.5, size.height * 0.22);
    redPath.cubicTo(
      size.width * 0.57, size.height * 0.22,
      size.width * 0.63, size.height * 0.25,
      size.width * 0.68, size.height * 0.29,
    );
    redPath.lineTo(size.width * 0.81, size.height * 0.16);
    redPath.cubicTo(
      size.width * 0.73, size.height * 0.09,
      size.width * 0.62, size.height * 0.04,
      size.width * 0.50, size.height * 0.04,
    );
    redPath.cubicTo(
      size.width * 0.32, size.height * 0.04,
      size.width * 0.17, size.height * 0.14,
      size.width * 0.09, size.height * 0.29,
    );
    redPath.lineTo(size.width * 0.24, size.height * 0.41);
    redPath.cubicTo(
      size.width * 0.28, size.height * 0.30,
      size.width * 0.38, size.height * 0.22,
      size.width * 0.50, size.height * 0.22,
    );
    canvas.drawPath(redPath, paint);
  }

  @override
  bool shouldRepaint(CustomPainter oldDelegate) => false;
}

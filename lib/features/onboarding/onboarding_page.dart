import 'package:flutter/material.dart';
import 'package:memory_jar/core/theme/app_colors.dart';
import 'package:memory_jar/shared/widgets/jar_widget.dart';

class OnboardingPage extends StatefulWidget {
  const OnboardingPage({super.key});

  @override
  State<OnboardingPage> createState() => _OnboardingPageState();
}

class _OnboardingPageState extends State<OnboardingPage> {
  final PageController _pageController = PageController();
  int _currentPage = 0;

  final List<OnboardingSlide> _slides = const [
    OnboardingSlide(
      title: '행복했던 순간을 담아요',
      body: '짧게 적고, 병에 넣어두면 끝.',
      showJar: true,
      jarNoteCount: 1,
    ),
    OnboardingSlide(
      title: '해파리도 함께 자라요',
      body: '보름달물해파리는 알에서 시작해, 여러 모습을 거쳐 해파리가 됩니다. 해파리처럼 올해의 흐름을 같이 지나가요.',
      showJellyfishStages: true,
    ),
    OnboardingSlide(
      title: '연말에 한 번에 열어요',
      body: '지금은 보관하고, 연말에 꺼내보는 기록.',
      showJar: true,
      jarNoteCount: 8,
      showSeasonBar: true,
    ),
  ];

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  void _handleNext() {
    if (_currentPage < _slides.length - 1) {
      _pageController.nextPage(
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeInOut,
      );
    } else {
      // Navigate to login
      Navigator.pushReplacementNamed(context, '/login');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 48),
          child: Column(
            children: [
              // Progress dots
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: List.generate(
                  _slides.length,
                  (index) => AnimatedContainer(
                    duration: const Duration(milliseconds: 300),
                    margin: const EdgeInsets.symmetric(horizontal: 4),
                    width: _currentPage == index ? 32 : 6,
                    height: 6,
                    decoration: BoxDecoration(
                      color: _currentPage == index
                          ? AppColors.primary
                          : AppColors.muted,
                      borderRadius: BorderRadius.circular(3),
                    ),
                  ),
                ),
              ),
              
              const SizedBox(height: 32),
              
              // Content
              Expanded(
                child: PageView.builder(
                  controller: _pageController,
                  onPageChanged: (index) {
                    setState(() {
                      _currentPage = index;
                    });
                  },
                  itemCount: _slides.length,
                  itemBuilder: (context, index) {
                    return _OnboardingSlideWidget(slide: _slides[index]);
                  },
                ),
              ),
              
              // Next button
              SizedBox(
                width: double.infinity,
                height: 56,
                child: ElevatedButton(
                  onPressed: _handleNext,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppColors.primary,
                    foregroundColor: AppColors.primaryForeground,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(16),
                    ),
                    elevation: 0,
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        _currentPage == _slides.length - 1 ? '병 만들기' : '다음',
                        style: const TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                      const SizedBox(width: 8),
                      const Icon(Icons.chevron_right, size: 20),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class OnboardingSlide {
  final String title;
  final String body;
  final bool showJar;
  final int jarNoteCount;
  final bool showJellyfishStages;
  final bool showSeasonBar;

  const OnboardingSlide({
    required this.title,
    required this.body,
    this.showJar = false,
    this.jarNoteCount = 0,
    this.showJellyfishStages = false,
    this.showSeasonBar = false,
  });
}

class _OnboardingSlideWidget extends StatelessWidget {
  final OnboardingSlide slide;

  const _OnboardingSlideWidget({required this.slide});

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const SizedBox(height: 20),
          
          // Illustration
          if (slide.showJar) ...[
            JarWidget(noteCount: slide.jarNoteCount),
            const SizedBox(height: 40),
          ],
          
          if (slide.showJellyfishStages) ...[
            _buildJellyfishStages(),
            const SizedBox(height: 40),
          ],
          
          if (slide.showSeasonBar) ...[
            _buildSeasonBar(),
            const SizedBox(height: 24),
          ],
          
          // Text content
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: Column(
              children: [
                Text(
                  slide.title,
                  textAlign: TextAlign.center,
                  style: const TextStyle(
                    fontSize: 24,
                    fontWeight: FontWeight.w600,
                    color: AppColors.foreground,
                    height: 1.4,
                  ),
                ),
                const SizedBox(height: 12),
                Text(
                  slide.body,
                  textAlign: TextAlign.center,
                  style: const TextStyle(
                    fontSize: 15,
                    color: AppColors.mutedForeground,
                    height: 1.6,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildJellyfishStages() {
    // 나노바나나 스타일 해파리 이미지 - 6단계 모두 표시
    return Column(
      children: [
        // First row: 3 stages
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            _buildStageItem('알', 'assets/images/jellyfish/jellyfish_stage_01_egg.png'),
            const SizedBox(width: 16),
            _buildStageItem('플라놀라', 'assets/images/jellyfish/jellyfish_stage_02_planula.png'),
            const SizedBox(width: 16),
            _buildStageItem('폴립', 'assets/images/jellyfish/jellyfish_stage_03_polyp.png'),
          ],
        ),
        const SizedBox(height: 16),
        // Second row: 3 stages
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            _buildStageItem('스트로빌라', 'assets/images/jellyfish/jellyfish_stage_04_strobila.png'),
            const SizedBox(width: 16),
            _buildStageItem('에피라', 'assets/images/jellyfish/jellyfish_stage_05_ephyra.png'),
            const SizedBox(width: 16),
            _buildStageItem('성체', 'assets/images/jellyfish/jellyfish_stage_06_medusa.png'),
          ],
        ),
      ],
    );
  }

  Widget _buildStageItem(String label, String imagePath) {
    return Column(
      children: [
        SizedBox(
          width: 60,
          height: 60,
          child: Image.asset(
            imagePath,
            fit: BoxFit.contain,
          ),
        ),
        const SizedBox(height: 6),
        Text(
          label,
          style: const TextStyle(
            fontSize: 10,
            color: AppColors.mutedForeground,
          ),
        ),
      ],
    );
  }

  Widget _buildSeasonBar() {
    return Container(
      width: 280,
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      decoration: BoxDecoration(
        color: AppColors.card,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.border, width: 1),
      ),
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
          width: 48,
          height: 48,
          decoration: BoxDecoration(
            color: bgColor.withValues(alpha: 0.5),
            shape: BoxShape.circle,
          ),
          child: Center(
            child: Text(
              emoji,
              style: const TextStyle(fontSize: 20),
            ),
          ),
        ),
        const SizedBox(height: 6),
        Text(
          label,
          style: const TextStyle(
            fontSize: 11,
            color: AppColors.mutedForeground,
          ),
        ),
      ],
    );
  }
}

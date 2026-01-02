import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:memory_jar/core/config/app_config.dart';
import 'package:memory_jar/features/jellyfish/jellyfish_stage.dart';

/// Service responsible for calculating jellyfish growth stage
/// 해파리 성장 단계 계산 서비스
/// 
/// CRITICAL: Growth is based on DATE, NOT on number of records
/// 성장은 날짜 기반이며, 기록 개수와 무관함
class JellyfishService {
  /// Calculate current jellyfish stage based on current date
  /// 현재 날짜를 기반으로 해파리 단계 계산
  JellyfishStage getCurrentStage() {
    final now = DateTime.now();
    final month = now.month;

    // Get stage from month mapping
    return AppConfig.monthToStageMapping[month] ?? JellyfishStage.egg;
  }

  /// Calculate jellyfish stage for a specific date
  /// 특정 날짜의 해파리 단계 계산
  JellyfishStage getStageForDate(DateTime date) {
    final month = date.month;
    return AppConfig.monthToStageMapping[month] ?? JellyfishStage.egg;
  }

  /// Check if the jar can be opened (year-end)
  /// 연말 개봉 가능 여부 확인
  bool canOpenJar() {
    final now = DateTime.now();
    final openDate = AppConfig.getYearOpenDate(now.year);

    // Can open on or after December 31st
    return now.isAfter(openDate) || now.isAtSameMomentAs(openDate);
  }
}

/// Provider for JellyfishService
final jellyfishServiceProvider = Provider<JellyfishService>((ref) {
  return JellyfishService();
});

/// Provider for current jellyfish stage
/// This will update when the app is reopened
final currentJellyfishStageProvider = Provider<JellyfishStage>((ref) {
  final service = ref.watch(jellyfishServiceProvider);
  return service.getCurrentStage();
});

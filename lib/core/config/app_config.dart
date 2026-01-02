import 'package:memory_jar/features/jellyfish/jellyfish_stage.dart';

/// Environment configuration for Memory Jar app
/// This file contains date-based mappings and app-wide constants
class AppConfig {
  AppConfig._();

  /// Current app version
  static const String appVersion = '1.0.0';

  /// Maximum free moments before paywall
  static const int maxFreeMoments = 20;

  /// In-App Purchase Product ID prefix
  static const String iapProductIdPrefix = 'jar_year_';

  /// Year-end opening configuration
  /// The jar opens on December 31st at 00:00
  static DateTime getYearOpenDate(int year) {
    return DateTime(year, 12, 31);
  }

  /// Month-to-Stage mapping
  /// Maps calendar months to jellyfish growth stages
  /// 날짜 기반 성장 단계 매핑
  static Map<int, JellyfishStage> get monthToStageMapping => {
        // March-April: Egg stage (수정란)
        3: JellyfishStage.egg,
        4: JellyfishStage.egg,

        // May-June: Planula stage (플라놀라 유생)
        5: JellyfishStage.planula,
        6: JellyfishStage.planula,

        // July: Polyp stage (폴립)
        7: JellyfishStage.polyp,

        // August: Strobila stage (스트로빌라)
        8: JellyfishStage.strobila,

        // September-October: Ephyra stage (에피라)
        9: JellyfishStage.ephyra,
        10: JellyfishStage.ephyra,

        // November-December: Medusa stage (성체)
        11: JellyfishStage.medusa,
        12: JellyfishStage.medusa,

        // January-February: Egg stage (new cycle)
        1: JellyfishStage.egg,
        2: JellyfishStage.egg,
      };
}

/// Jellyfish growth stages based on biological lifecycle of Moon Jellyfish
/// 보름달물해파리의 생물학적 생애주기 기반 성장 단계
enum JellyfishStage {
  /// 수정란 (Fertilized Egg)
  egg,

  /// 플라놀라 유생 (Planula Larva)
  planula,

  /// 폴립 (Polyp)
  polyp,

  /// 스트로빌라 (Strobila)
  strobila,

  /// 에피라 (Ephyra)
  ephyra,

  /// 해파리 성체 (Adult Medusa)
  medusa,
}

extension JellyfishStageExtension on JellyfishStage {
  /// Get asset path for this stage
  String get assetPath {
    switch (this) {
      case JellyfishStage.egg:
        return 'assets/images/jellyfish/jellyfish_stage_01_egg.png';
      case JellyfishStage.planula:
        return 'assets/images/jellyfish/jellyfish_stage_02_planula.png';
      case JellyfishStage.polyp:
        return 'assets/images/jellyfish/jellyfish_stage_03_polyp.png';
      case JellyfishStage.strobila:
        return 'assets/images/jellyfish/jellyfish_stage_04_strobila.png';
      case JellyfishStage.ephyra:
        return 'assets/images/jellyfish/jellyfish_stage_05_ephyra.png';
      case JellyfishStage.medusa:
        return 'assets/images/jellyfish/jellyfish_stage_06_medusa.png';
    }
  }

  /// Get scale factor for this stage (for visual progression)
  double get scaleFactor {
    switch (this) {
      case JellyfishStage.egg:
        return 0.3;
      case JellyfishStage.planula:
        return 0.45;
      case JellyfishStage.polyp:
        return 0.6;
      case JellyfishStage.strobila:
        return 0.75;
      case JellyfishStage.ephyra:
        return 0.9;
      case JellyfishStage.medusa:
        return 1.0;
    }
  }
}

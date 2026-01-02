# Memory Jar (해피저금)

A mindful companion app with a growing jellyfish friend - Flutter + Firebase implementation.

## ✨ Project Philosophy

This is **NOT**:
- ❌ A game
- ❌ A productivity app
- ❌ A system that evaluates users

This **IS**:
- ✅ A mindful recording experience
- ✅ A companion app with a jellyfish that grows with time
- ✅ A year-end memory jar to open at the end of the year

## 🎯 Core Concept

**Growth is time-based, NOT action-based.**

The jellyfish companion grows through the calendar months, completely independent of user activity. This reinforces the philosophy that the app doesn't evaluate or reward productivity - it simply exists as a peaceful companion while you record your moments.

## 📱 Implemented Features

### ✅ Phase 1: Jellyfish Growth System (COMPLETE)

#### 1. **Jellyfish Stages** (`JellyfishStage` enum)
   - 6 biological stages of moon jellyfish:
     - 🥚 **Egg** (수정란) - January-April
     - 🦠 **Planula** (플라놀라) - May-June  
     - 🌱 **Polyp** (폴립) - July
     - 🔗 **Strobila** (스트로빌라) - August
     - ⭐ **Ephyra** (에피라) - September-October
     - 🌊 **Medusa** (성체) - November-December
   
   - Each stage has:
     - Unique PNG asset (768×768px)
     - Stage-specific scale factor
     - Month-based calculation logic

#### 2. **JellyfishService** - Date-Based Growth Calculator
   - Calculates current stage based on system date
   - Month-to-stage mapping in `AppConfig`
   - **Intentionally disconnected from user records**
   - Provides year-end opening date calculation

#### 3. **Interactive Jellyfish Widget**
   - **Tap (Short Press):**
     - Scale animation (1.0 → 1.08 → 1.0)
     - Slight rotation effect
     - No functional outcome (just acknowledgment)
   
   - **Long Press (2+ seconds):**
     - Triggers speech bubble
     - Shows random educational fact
     - Auto-dismisses after 8 seconds

#### 4. **Educational Speech Bubbles**
   - 6 facts about moon jellyfish (보름달물해파리)
   - Exact Korean text as specified
   - Auto-appear and auto-dismiss (no close button)
   - Smooth fade animations

#### 5. **App Theme**
   - Calming color palette:
     - Primary: `#6C63FF` (purple)
     - Secondary: `#4ECDC4` (teal)
     - Background: `#F5F7FA` (light gray)
   - Korean-optimized typography
   - Material 3 design system

## 📁 Project Structure

```
lib/
├─ main.dart                      # App entry point with Riverpod
├─ app.dart                       # Main app widget
├─ core/
│  ├─ theme/
│  │  └─ app_theme.dart          # Complete theme configuration
│  └─ config/
│     └─ app_config.dart         # Environment & month mapping
├─ features/
│  └─ jellyfish/
│     ├─ jellyfish_stage.dart           # Stage enum & extensions
│     ├─ jellyfish_service.dart         # Date-based calculator
│     ├─ jellyfish_widget.dart          # Interactive widget
│     ├─ jellyfish_speech_bubble.dart   # Educational facts
│     └─ jellyfish_home_page.dart       # Main screen
└─ shared/
   ├─ widgets/                    # (Reserved for future)
   └─ animations/                 # (Reserved for future)

assets/
└─ images/
   └─ jellyfish/
      ├─ jellyfish_stage_01_egg.png
      ├─ jellyfish_stage_02_planula.png
      ├─ jellyfish_stage_03_polyp.png
      ├─ jellyfish_stage_04_strobila.png
      ├─ jellyfish_stage_05_ephyra.png
      └─ jellyfish_stage_06_medusa.png
```

## 🚀 Getting Started

### Prerequisites
- Flutter SDK (>=3.7.0)
- Dart (>=3.7.0)
- Xcode (for iOS)
- Android Studio (for Android)

### Installation

1. **Install dependencies:**
   ```bash
   flutter pub get
   ```

2. **Run the app:**
   ```bash
   # iOS Simulator
   flutter run -d iPhone

   # Android Emulator
   flutter run -d emulator-5554

   # Check available devices
   flutter devices
   ```

3. **Run tests:**
   ```bash
   flutter test
   ```

4. **Static analysis:**
   ```bash
   flutter analyze
   ```

## 🔧 Current Tech Stack

### Frontend
- **Flutter** (stable channel)
- **State Management:** Riverpod 2.6+
- **Routing:** go_router 14.6+ (ready to use)
- **Animations:** Flutter built-in only

### Backend (To Be Configured)
- **Firebase:**
  - ✅ Dependencies installed
  - ⏳ Firebase configuration pending
  - ⏳ Anonymous auth setup
  - ⏳ Firestore rules
  - ⏳ Cloud Functions
  - ⏳ FCM setup

### Monetization (To Be Implemented)
- **In-App Purchase:** Non-consumable
- **Product ID:** `jar_year_<YEAR>`
- **Price:** ₩2,500 per year

## 🎨 Assets

All jellyfish stage images are located in `assets/images/jellyfish/`

- **Format:** PNG with transparent background
- **Size:** 768×768px (recommended)
- **Naming:** `jellyfish_stage_0X_<name>.png`

The initial egg stage (`jellyfish_stage_01_egg.png`) was provided as `c1.png`.
Other stages were generated to match the biological lifecycle of moon jellyfish.

## ⏭️ Next Steps

### Phase 2: Moment Recording System
- [ ] Create moment model (Firestore schema)
- [ ] Moment input screen
- [ ] 20 free moments limit
- [ ] Paywall at 21st moment
- [ ] Prevent viewing until year-end

### Phase 3: Firebase Integration
- [ ] Set up Firebase project
- [ ] Configure FlutterFire
- [ ] Anonymous authentication
- [ ] Firestore security rules
- [ ] Cloud Functions for year-end opening logic

### Phase 4: Year-End Opening
- [ ] Year-end gate logic
- [ ] Card-by-card viewer
- [ ] Prevent bulk view (no list view)

### Phase 5: In-App Purchase
- [ ] iOS StoreKit configuration
- [ ] Android Billing configuration
- [ ] Product setup (₩2,500)
- [ ] Purchase flow
- [ ] Restore purchases
- [ ] Debug mode override

### Phase 6: Settings & Polish
- [ ] Settings screen
- [ ] Account management (Apple/Google sign-in)
- [ ] Notifications (FCM)
- [ ] App icons & splash screen
- [ ] Localization (Korean primary)

## ⚠️ Important Constraints

### What NOT to Do:
1. ❌ **Never** show level/stage numbers to users
2. ❌ **Never** display XP, percentages, or progress bars
3. ❌ **Never** make jellyfish growth depend on record count
4. ❌ **Never** add list/timeline UI for moments before year-end
5. ❌ **Never** use game-like UI elements
6. ❌ **Never** treat jellyfish as a "reward"

### Core Principles:
- Recording is a **ritual**, not a task
- Jellyfish is a **companion**, not a reward
- Growth is **time-based**, not achievement-based
- The app **never evaluates** the user

## 📝 Development Notes

### Jellyfish Month Mapping (Current Configuration)

| Months | Stage | Korean | Scale |
|--------|-------|--------|-------|
| Jan-Apr | Egg | 수정란 | 0.3 |
| May-Jun | Planula | 플라놀라 | 0.45 |
| July | Polyp | 폴립 | 0.6 |
| August | Strobila | 스트로빌라 | 0.75 |
| Sep-Oct | Ephyra | 에피라 | 0.9 |
| Nov-Dec | Medusa | 성체 | 1.0 |

*Note: This mapping can be adjusted in `lib/core/config/app_config.dart`*

### Educational Facts
All 6 facts about moon jellyfish are hardcoded in Korean in `JellyfishFacts.facts`.
They are scientifically accurate and meant to educate while delighting users.

## 📄 License

Proprietary - Memory Jar (해피저금)  
© 2026 All rights reserved.

## 🙋 Support

For development questions or clarifications on the specification, refer to the original specification document: "Sonnet 개발 지시서 — Flutter + Firebase 실구현 FULL SPEC"

---

**Current Status:** ✅ Phase 1 Complete - Jellyfish Growth System Fully Functional

**Next Milestone:** Phase 2 - Moment Recording System
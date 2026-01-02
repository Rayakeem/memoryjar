# Memory Jar - Quick Start Guide

## 🚀 Running the App

### Option 1: Run on macOS (Fastest for Testing)
```bash
cd /Users/kimsohee/Documents/GitHub/memoryjar
flutter run -d macos
```

### Option 2: Run on iOS Simulator
First, open an iOS simulator:
```bash
# List available simulators
xcrun simctl list devices

# Boot a simulator (example: iPhone 15)
open -a Simulator

# Then run Flutter
flutter run -d "iPhone 15"
```

### Option 3: Run on Your Physical iPhone
```bash
flutter run -d "soheekim (wireless)"
```
Note: Device must be in Developer Mode and unlocked.

### Option 4: Run in Chrome (Web)
```bash
flutter run -d chrome
```
Note: Some animations may behave differently on web.

---

## 🧪 Quick Test Checklist

After running the app, verify:

1. **App Launches:** ✓
   - No errors in console
   - Home screen appears

2. **Jellyfish Displays:** ✓
   - Jellyfish image shows in center
   - Size appears correct for current stage
   - Current date: January 2026 → Should show **Egg** stage 🥚

3. **Tap Interaction:** ✓
   - Tap jellyfish
   - Should scale up and rotate slightly
   - Should return to normal size

4. **Long Press Interaction:** ✓
   - Press and hold jellyfish for 2 seconds
   - Speech bubble should appear at top
   - Should show random Korean fact
   - Should auto-dismiss after 8 seconds

5. **UI Elements:** ✓
   - Hint text visible: "해파리를 길게 눌러보세요"
   - Floating action button: "기록 남기기"
   - Background color is light gray

6. **Theme:** ✓
   - Colors match spec (purple/teal)
   - Korean text renders properly
   - No visual glitches

---

## 📅 Testing Different Jellyfish Stages

Since growth is date-based, you can test different stages by temporarily changing the device's system date:

| Test Date | Expected Stage | Korean Name | Scale |
|-----------|---------------|-------------|-------|
| January 15 | Egg | 수정란 | Small (0.3) |
| May 15 | Planula | 플라놀라 | 0.45 |
| July 15 | Polyp | 폴립 | 0.6 |
| August 15 | Strobila | 스트로빌라 | 0.75 |
| September 15 | Ephyra | 에피라 | 0.9 |
| December 15 | Medusa | 성체 | Full size (1.0) |

**Steps to test:**
1. Close the app
2. Change device system date in Settings
3. Restart the app
4. Verify jellyfish stage matches the expected stage
5. Reset date when done

---

## 🐛 Troubleshooting

### Build Errors

**Issue:** "CocoaPods not installed" (iOS)
```bash
sudo gem install cocoapods
cd ios
pod install
cd ..
```

**Issue:** Module not found
```bash
flutter clean
flutter pub get
```

**Issue:** Gradle errors (Android)
```bash
cd android
./gradlew clean
cd ..
flutter clean
flutter pub get
```

### Runtime Errors

**Issue:** Image asset not loading
- Check `pubspec.yaml` has `assets/images/jellyfish/` listed
- Run `flutter clean && flutter pub get`
- Verify all 6 PNG files exist in `assets/images/jellyfish/`

**Issue:** Long press not triggering
- Try pressing for full 2+ seconds
- Check device touch sensitivity settings
- Verify no console errors

### Performance Issues

**Issue:** Animations stuttering
- Try on a physical device instead of simulator
- macOS simulator sometimes has animation lag
- Use `flutter run --profile` for better performance

---

## 📱 Device-Specific Notes

### iOS
- Minimum iOS version: 12.0 (configured in `ios/Podfile`)
- Requires Developer Mode for wireless testing
- Use Xcode to check signing/provisioning if build fails

### Android
- Minimum SDK: 21 (Android 5.0)
- Target SDK: 34
- Make sure USB debugging is enabled

### macOS
- Minimum macOS version: 10.14
- Best for quick iteration during development
- Some mobile-specific features may not work

---

## 🎨 Asset Verification

All jellyfish images should be present:
```bash
ls -lh assets/images/jellyfish/
```

Expected output:
```
jellyfish_stage_01_egg.png
jellyfish_stage_02_planula.png
jellyfish_stage_03_polyp.png
jellyfish_stage_04_strobila.png
jellyfish_stage_05_ephyra.png
jellyfish_stage_06_medusa.png
```

---

## 🔍 Code Quality Check

Before committing changes:
```bash
# Static analysis
flutter analyze

# Run tests
flutter test

# Format code
flutter format lib/

# Check for outdated packages
flutter pub outdated
```

All should pass with no issues.

---

## 🎯 Next Development Steps

Once you've verified Phase 1 works:

1. **Set up Firebase:**
   ```bash
   # Install Firebase CLI
   npm install -g firebase-tools
   
   # Login to Firebase
   firebase login
   
   # Install FlutterFire CLI
   dart pub global activate flutterfire_cli
   
   # Configure Firebase
   flutterfire configure
   ```

2. **Start Phase 2:**
   - Review `IMPLEMENTATION_STATUS.md`
   - Create moment data models
   - Build moment input screen

---

## 📞 Support

If you encounter issues not covered here:
1. Check Flutter documentation: https://docs.flutter.dev
2. Check Firebase documentation: https://firebase.google.com/docs
3. Refer to the original spec document for requirements

---

**Status:** ✅ Phase 1 Complete and Ready for Testing

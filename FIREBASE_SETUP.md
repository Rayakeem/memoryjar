# Firebase Configuration Setup

## 🔑 API Keys and Security

### Important: Firebase API Keys Are Safe to Expose

Firebase API keys in client apps are **NOT secret**:
- They are designed for client-side use
- They're embedded in your app bundle (anyone can extract them)
- They only identify your Firebase project
- Real security comes from:
  - ✅ Firestore Security Rules
  - ✅ Firebase Authentication
  - ✅ App Check (app integrity verification)

**Reference:** [Firebase API Key Security](https://firebase.google.com/docs/projects/api-keys)

---

## 📁 Configuration Files

These files are **gitignored** as best practice (but safe to commit):

1. **iOS:** `ios/Runner/GoogleService-Info.plist`
2. **Android:** `android/app/google-services.json`
3. **Flutter:** `lib/firebase_options.dart`

---

## 🔄 Setting Up Firebase (For New Developers)

If you're setting up this project from scratch, follow these steps:

### 1. Install Firebase CLI

```bash
npm install -g firebase-tools
firebase login
```

### 2. Install FlutterFire CLI

```bash
dart pub global activate flutterfire_cli
```

### 3. Configure Firebase

```bash
flutterfire configure --project=memoryjar-64448
```

This will automatically:
- Download configuration files
- Create `firebase_options.dart`
- Register iOS and Android apps

### 4. Manual Setup (Alternative)

If FlutterFire CLI doesn't work, manually download from Firebase Console:

**Firebase Console:** https://console.firebase.google.com/project/memoryjar-64448/settings/general

1. **For iOS:**
   - Download `GoogleService-Info.plist`
   - Place in `ios/Runner/GoogleService-Info.plist`

2. **For Android:**
   - Download `google-services.json`
   - Place in `android/app/google-services.json`

3. **Create `lib/firebase_options.dart`:**
   - Copy API keys from the config files
   - Use the template from the existing file

---

## 🔒 Security Best Practices

### 1. Firestore Security Rules

Location: Firebase Console → Firestore Database → Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Only authenticated users can access their own data
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Moments are private until year-end
    match /jars/{jarId}/moments/{momentId} {
      allow write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow read: if request.auth != null && 
                     request.auth.uid == resource.data.userId &&
                     request.time >= timestamp.date(2026, 12, 31);
    }
  }
}
```

### 2. Firebase Authentication

- Enable Anonymous Authentication
- Later: Add Apple Sign In and Google Sign In

### 3. API Key Restrictions (Optional)

In Firebase Console → Project Settings → API Keys:
- Restrict Android key to your app's SHA-1 fingerprint
- Restrict iOS key to your bundle ID

### 4. App Check (Recommended for Production)

Prevents unauthorized access to your Firebase resources:
```bash
# Enable in Firebase Console → Build → App Check
```

---

## 📊 Firebase Project Details

- **Project Name:** memoryjar
- **Project ID:** memoryjar-64448
- **Project Number:** 302363164862
- **Region:** Default (multi-region)

### App IDs

- **iOS:** `kr.memoryjar.memoryJar`
- **Android:** `kr.memoryjar.memory_jar`

---

## ⚠️ Important Notes

1. **Never commit actual secrets** like:
   - Service Account keys (`.json` files for admin SDK)
   - Database passwords
   - OAuth client secrets

2. **Firebase config files are OK** because:
   - They contain only client-side identifiers
   - Security is managed by Firebase Security Rules
   - They're in the app bundle anyway

3. **For CI/CD:**
   - Store config files as GitHub Secrets
   - Decode and place them during build

---

## 🆘 Troubleshooting

### "Default FirebaseApp is not initialized"

Make sure `main.dart` contains:
```dart
await Firebase.initializeApp(
  options: DefaultFirebaseOptions.currentPlatform,
);
```

### "google-services.json not found" (Android)

```bash
cd android
./gradlew clean
cd ..
flutter clean
flutter pub get
```

### "GoogleService-Info.plist not found" (iOS)

Check that the file is in `ios/Runner/` and is included in Xcode project.

---

**Last Updated:** 2026-01-02  
**Firebase SDK Version:** See `pubspec.yaml`

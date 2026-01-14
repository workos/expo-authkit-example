# Expo AuthKit Example

A React Native Expo example demonstrating secure authentication with WorkOS AuthKit using PKCE (Proof Key for Code Exchange).

https://github.com/user-attachments/assets/08fa87b3-4b8c-43be-8a70-f85c0ffb23c8

## Features

- 🔐 **Secure PKCE Authentication** - No client secrets in the app
- 📱 **Native Deep Linking** - Seamless OAuth callback handling
- 🔒 **Secure Token Storage** - Uses Expo SecureStore (hardware-backed)
- 🔄 **Automatic Token Refresh** - Transparent session management
- 🎨 **React Native Paper UI** - Material Design components
- 🔧 **Uses Official WorkOS SDK** - Full `@workos-inc/node` support via WebCrypto polyfill

## Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [WorkOS Account](https://workos.com) with AuthKit configured
- iOS Simulator or Android Emulator (development build required)

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. WebCrypto Polyfill (Critical)

The `@workos-inc/node` SDK uses WebCrypto APIs (`crypto.subtle`) for PKCE. React Native doesn't provide these natively, so we use `react-native-quick-crypto`:

```bash
npm install react-native-quick-crypto
```

**Why is this needed?** The WorkOS SDK's `getAuthorizationUrlWithPKCE()` uses `crypto.subtle.digest()` for SHA-256 hashing. This polyfill provides a native C++/JSI implementation of the full WebCrypto API.

**Important:** The polyfill must be installed before any other code runs:

```typescript
// index.ts (app entry point)
import './src/polyfills'; // Must be FIRST import!
import { registerRootComponent } from 'expo';
import App from './App';
registerRootComponent(App);
```

```typescript
// src/polyfills.ts
import { install } from 'react-native-quick-crypto';
install();
```

### 3. Configure WorkOS

1. Copy the environment template:

   ```bash
   cp .env.example .env
   ```

2. Add your WorkOS Client ID to `.env`:

   ```
   EXPO_PUBLIC_WORKOS_CLIENT_ID=client_XXXXXXXXX
   ```

3. Add the redirect URI to your [WorkOS Dashboard](https://dashboard.workos.com/configuration):
   ```
   workos-authkit-example://callback
   ```

### 4. Create a Development Build

**Important:** A development build is required for two reasons:

1. Expo Go cannot handle custom URL schemes for OAuth callbacks
2. The `react-native-quick-crypto` polyfill requires native code compilation

```bash
# iOS
npx expo run:ios

# Android
npx expo run:android
```

## Running the App

After creating a development build:

```bash
npx expo start --dev-client
```

## Project Structure

```
expo-authkit-example/
├── index.ts                    # Entry point (loads polyfills first!)
├── App.tsx                     # Main app with navigation
├── app.json                    # Expo config (scheme defined here)
├── src/
│   ├── polyfills.ts           # WebCrypto polyfill for WorkOS SDK
│   ├── lib/
│   │   └── auth.ts            # Core auth logic (uses WorkOS SDK)
│   ├── context/
│   │   └── AuthContext.tsx    # Shared auth state provider
│   ├── hooks/
│   │   └── useAuth.ts         # Re-exports from context
│   └── components/
│       ├── SignInButton.tsx   # Sign in/out button
│       ├── Home.tsx           # Home view
│       ├── Account.tsx        # Account view (authenticated)
│       └── Footer.tsx         # WorkOS branding
```

## How It Works

### Authentication Flow

1. **Sign In**: User taps "Sign In" → Opens browser with PKCE-protected WorkOS auth URL
2. **Authenticate**: User authenticates with their Identity Provider
3. **Callback**: WorkOS redirects to `workos-authkit-example://callback?code=...`
4. **Token Exchange**: App exchanges code for tokens using stored PKCE verifier
5. **Session Storage**: Tokens stored securely in Expo SecureStore

### Key Security Features

| Feature          | Implementation                                             |
| ---------------- | ---------------------------------------------------------- |
| No client secret | PKCE flow via WorkOS SDK's `getAuthorizationUrlWithPKCE()` |
| Secure storage   | Expo SecureStore (Keychain/Keystore)                       |
| Token refresh    | WorkOS SDK's `authenticateWithRefreshToken()`              |
| CSRF protection  | State parameter in OAuth flow                              |
| Native crypto    | `react-native-quick-crypto` (C++/JSI, not JS)              |

## Comparison with Electron Example

This example mirrors the [electron-authkit-example](../electron-authkit-example) architecture:

| Electron               | Expo                                 |
| ---------------------- | ------------------------------------ |
| `electron-store`       | `expo-secure-store`                  |
| `shell.openExternal()` | `WebBrowser.openAuthSessionAsync()`  |
| Protocol handlers      | `expo-linking` deep links            |
| IPC for auth           | Direct function calls                |
| Native Node.js crypto  | `react-native-quick-crypto` polyfill |

## Troubleshooting

### "ReferenceError: Property 'crypto' doesn't exist" or "Cannot read property 'digest' of undefined"

The WebCrypto polyfill isn't loading. Check:

1. `react-native-quick-crypto` is installed
2. The polyfill import is the **FIRST** line in your entry file (before any other imports)
3. You've done a native rebuild after installing (`npx expo run:ios`)

```typescript
// ✅ Correct - polyfill FIRST
import './src/polyfills';
import { registerRootComponent } from 'expo';

// ❌ Wrong - other imports before polyfill
import { registerRootComponent } from 'expo';
import './src/polyfills'; // Too late!
```

### "Invariant Violation: Linking requires a build-time setting scheme"

You need a development build. Expo Go doesn't support custom schemes or native modules:

```bash
npx expo run:ios  # or run:android
```

### OAuth callback not working

1. Verify the redirect URI in WorkOS Dashboard matches `workos-authkit-example://callback`
2. Ensure `scheme` is set in `app.json`
3. Check you're using a development build, not Expo Go

### Auth state not updating across components

If signing in doesn't update all components (e.g., header button still shows "Sign In"):

- Ensure all components use `useAuth()` from the same context
- The app must be wrapped in `<AuthProvider>` (see `App.tsx`)

### Token refresh failing

The refresh token may have expired. Clear the app data and sign in again.

## Resources

- [WorkOS AuthKit Documentation](https://workos.com/docs/authkit)
- [react-native-quick-crypto](https://github.com/margelo/react-native-quick-crypto) - WebCrypto polyfill for React Native
- [Expo SecureStore](https://docs.expo.dev/versions/latest/sdk/securestore/)
- [Expo WebBrowser](https://docs.expo.dev/versions/latest/sdk/webbrowser/)
- [Expo Linking](https://docs.expo.dev/versions/latest/sdk/linking/)
- [OAuth 2.0 PKCE](https://datatracker.ietf.org/doc/html/rfc7636)

## License

MIT

# Expo AuthKit Example

A React Native Expo example demonstrating secure authentication with WorkOS AuthKit using PKCE (Proof Key for Code Exchange).

## Features

- 🔐 **Secure PKCE Authentication** - No client secrets in the app
- 📱 **Native Deep Linking** - Seamless OAuth callback handling
- 🔒 **Secure Token Storage** - Uses Expo SecureStore (hardware-backed)
- 🔄 **Automatic Token Refresh** - Transparent session management
- 🎨 **React Native Paper UI** - Material Design components

## Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [WorkOS Account](https://workos.com) with AuthKit configured
- iOS Simulator or Android Emulator (Expo Go doesn't support custom schemes)

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure WorkOS

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

### 3. Create a Development Build

**Important:** Expo Go cannot handle custom URL schemes. You need a development build:

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
├── App.tsx                     # Main app with navigation
├── app.json                    # Expo config (scheme defined here)
├── src/
│   ├── lib/
│   │   └── auth.ts            # Core auth logic (PKCE, tokens)
│   ├── hooks/
│   │   └── useAuth.ts         # React hook for auth state
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

| Feature | Implementation |
|---------|----------------|
| No client secret | PKCE flow via `getAuthorizationUrlWithPKCE()` |
| Secure storage | Expo SecureStore (Keychain/Keystore) |
| Token refresh | Automatic refresh before expiry |
| CSRF protection | State parameter in OAuth flow |

## Comparison with Electron Example

This example mirrors the [electron-authkit-example](../electron-authkit-example) architecture:

| Electron | Expo |
|----------|------|
| `electron-store` | `expo-secure-store` |
| `shell.openExternal()` | `WebBrowser.openAuthSessionAsync()` |
| Protocol handlers | `expo-linking` deep links |
| IPC for auth | Direct function calls |

## Troubleshooting

### "Invariant Violation: Linking requires a build-time setting scheme"

You need a development build. Expo Go doesn't support custom schemes:
```bash
npx expo run:ios  # or run:android
```

### OAuth callback not working

1. Verify the redirect URI in WorkOS Dashboard matches `workos-authkit-example://callback`
2. Ensure `scheme` is set in `app.json`
3. Check you're using a development build, not Expo Go

### Token refresh failing

The refresh token may have expired. Clear the app data and sign in again.

## Resources

- [WorkOS AuthKit Documentation](https://workos.com/docs/authkit)
- [Expo SecureStore](https://docs.expo.dev/versions/latest/sdk/securestore/)
- [Expo Linking](https://docs.expo.dev/versions/latest/sdk/linking/)
- [OAuth 2.0 PKCE](https://datatracker.ietf.org/doc/html/rfc7636)

## License

MIT

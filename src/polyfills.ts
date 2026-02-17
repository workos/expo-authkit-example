import { polyfillWebCrypto } from 'expo-standard-web-crypto';
import { digest } from 'expo-crypto';

// Polyfill globalThis.crypto.getRandomValues for WorkOS SDK (Expo Go compatible)
polyfillWebCrypto();

// Polyfill crypto.subtle.digest — expo-standard-web-crypto doesn't include SubtleCrypto
if (!globalThis.crypto.subtle) {
  globalThis.crypto.subtle = { digest } as SubtleCrypto;
}

/**
 * Polyfills for React Native compatibility.
 *
 * Must be imported before any code that uses WebCrypto APIs.
 * react-native-quick-crypto provides a native C++/JSI implementation
 * of the Web Crypto API, enabling the WorkOS SDK to work in React Native.
 */
import { install } from 'react-native-quick-crypto';

// Polyfill global.crypto with native implementation
install();

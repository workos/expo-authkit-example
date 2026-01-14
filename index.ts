// Polyfills must be imported first - installs native crypto for WorkOS SDK
import './src/polyfills';

import { registerRootComponent } from 'expo';

import App from './App';

registerRootComponent(App);

import { useState } from 'react';
import { View, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {
  PaperProvider,
  MD3LightTheme,
  MD3DarkTheme,
  Appbar,
  Surface,
} from 'react-native-paper';

import { Home } from './src/components/Home';
import { Account } from './src/components/Account';
import { SignInButton } from './src/components/SignInButton';
import { Footer } from './src/components/Footer';
import { AuthProvider } from './src/context/AuthContext';
import type { ViewType } from './src/types';

// Custom theme with WorkOS purple accent
const customLightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#6366f1',
    primaryContainer: '#e0e7ff',
  },
};

const customDarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#818cf8',
    primaryContainer: '#312e81',
  },
};

function AppContent(): React.JSX.Element {
  const [currentView, setCurrentView] = useState<ViewType>('home');

  return (
    <SafeAreaView style={styles.safeArea}>
      <Surface style={styles.container}>
        <Appbar.Header>
          <Appbar.Action icon="home" onPress={() => setCurrentView('home')} />
          <Appbar.Action
            icon="account"
            onPress={() => setCurrentView('account')}
          />
          <Appbar.Content title="" />
          <SignInButton />
        </Appbar.Header>

        <View style={styles.content}>
          {currentView === 'home' && <Home />}
          {currentView === 'account' && <Account onNavigate={setCurrentView} />}
        </View>

        <Footer />
      </Surface>
    </SafeAreaView>
  );
}

export default function App(): React.JSX.Element {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? customDarkTheme : customLightTheme;

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

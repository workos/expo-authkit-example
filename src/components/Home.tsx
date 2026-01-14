/**
 * Home view component.
 * Shows welcome message and sign in prompt for unauthenticated users.
 */
import { View, StyleSheet } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { useAuth } from '../hooks/useAuth';
import { SignInButton } from './SignInButton';

export function Home(): React.JSX.Element {
  const { user } = useAuth();

  if (user) {
    return (
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="headlineMedium" style={styles.title}>
              Welcome back!
            </Text>
            <Text variant="bodyLarge" style={styles.subtitle}>
              {user.firstName
                ? `Hello, ${user.firstName}!`
                : `Hello, ${user.email}!`}
            </Text>
            <Text variant="bodyMedium" style={styles.description}>
              You're signed in with WorkOS AuthKit. Visit the Account page to
              see your profile details.
            </Text>
          </Card.Content>
          <Card.Actions>
            <SignInButton />
          </Card.Actions>
        </Card>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineMedium" style={styles.title}>
            WorkOS AuthKit Example
          </Text>
          <Text variant="bodyLarge" style={styles.subtitle}>
            Secure authentication for Expo apps
          </Text>
          <Text variant="bodyMedium" style={styles.description}>
            This example demonstrates how to integrate WorkOS AuthKit with React
            Native Expo using PKCE authentication. Sign in to get started.
          </Text>
        </Card.Content>
        <Card.Actions style={styles.actions}>
          <SignInButton large />
        </Card.Actions>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    maxWidth: 400,
    width: '100%',
  },
  title: {
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    marginBottom: 16,
    textAlign: 'center',
    opacity: 0.7,
  },
  description: {
    textAlign: 'center',
    opacity: 0.6,
  },
  actions: {
    justifyContent: 'center',
    paddingTop: 16,
  },
});

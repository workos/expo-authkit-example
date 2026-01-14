/**
 * Account view component.
 * Shows user profile details when authenticated.
 */
import { View, StyleSheet } from 'react-native';
import { Text, Card, Avatar, Button, Divider } from 'react-native-paper';
import { useAuth } from '../hooks/useAuth';

interface AccountProps {
  onNavigate: (view: 'home' | 'account') => void;
}

export function Account({ onNavigate }: AccountProps): React.JSX.Element {
  const { user, signOut } = useAuth();

  if (!user) {
    return (
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="headlineSmall" style={styles.title}>
              Not Signed In
            </Text>
            <Text variant="bodyMedium" style={styles.description}>
              Please sign in to view your account details.
            </Text>
          </Card.Content>
          <Card.Actions style={styles.actions}>
            <Button mode="contained" onPress={() => onNavigate('home')}>
              Go to Home
            </Button>
          </Card.Actions>
        </Card>
      </View>
    );
  }

  const initials = [user.firstName?.[0], user.lastName?.[0]]
    .filter(Boolean)
    .join('')
    .toUpperCase() || user.email[0].toUpperCase();

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.avatarContainer}>
            {user.profilePictureUrl ? (
              <Avatar.Image
                size={80}
                source={{ uri: user.profilePictureUrl }}
              />
            ) : (
              <Avatar.Text size={80} label={initials} />
            )}
          </View>

          <Text variant="headlineSmall" style={styles.name}>
            {user.firstName && user.lastName
              ? `${user.firstName} ${user.lastName}`
              : user.email}
          </Text>

          <Divider style={styles.divider} />

          <View style={styles.detailRow}>
            <Text variant="labelLarge" style={styles.label}>
              Email
            </Text>
            <Text variant="bodyMedium">{user.email}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text variant="labelLarge" style={styles.label}>
              User ID
            </Text>
            <Text variant="bodySmall" style={styles.userId}>
              {user.id}
            </Text>
          </View>

          {user.firstName && (
            <View style={styles.detailRow}>
              <Text variant="labelLarge" style={styles.label}>
                First Name
              </Text>
              <Text variant="bodyMedium">{user.firstName}</Text>
            </View>
          )}

          {user.lastName && (
            <View style={styles.detailRow}>
              <Text variant="labelLarge" style={styles.label}>
                Last Name
              </Text>
              <Text variant="bodyMedium">{user.lastName}</Text>
            </View>
          )}
        </Card.Content>

        <Card.Actions style={styles.actions}>
          <Button mode="outlined" onPress={signOut}>
            Sign Out
          </Button>
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
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  name: {
    textAlign: 'center',
    marginBottom: 8,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    textAlign: 'center',
    opacity: 0.6,
  },
  divider: {
    marginVertical: 16,
  },
  detailRow: {
    marginBottom: 12,
  },
  label: {
    opacity: 0.6,
    marginBottom: 2,
  },
  userId: {
    fontFamily: 'monospace',
    opacity: 0.8,
  },
  actions: {
    justifyContent: 'center',
    paddingTop: 8,
  },
});

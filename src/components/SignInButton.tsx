/**
 * Sign in/out button component.
 * Mirrors electron-authkit-example's SignInButton.tsx
 */
import { Button, ActivityIndicator } from 'react-native-paper';
import { useAuth } from '../hooks/useAuth';

interface SignInButtonProps {
  large?: boolean;
}

export function SignInButton({ large }: SignInButtonProps): React.JSX.Element {
  const { user, loading, signIn, signOut } = useAuth();

  if (loading) {
    return <ActivityIndicator />;
  }

  if (user) {
    return (
      <Button
        mode="outlined"
        onPress={signOut}
        compact={!large}
      >
        Sign Out
      </Button>
    );
  }

  return (
    <Button
      mode="contained"
      onPress={signIn}
      compact={!large}
    >
      {large ? 'Sign In with AuthKit' : 'Sign In'}
    </Button>
  );
}

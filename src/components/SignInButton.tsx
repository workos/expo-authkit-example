import { Button, ActivityIndicator } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';

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
      <Button mode="outlined" onPress={signOut} compact={!large}>
        Sign Out
      </Button>
    );
  }

  return (
    <Button mode="contained" onPress={signIn} compact={!large}>
      {large ? 'Sign In with AuthKit' : 'Sign In'}
    </Button>
  );
}

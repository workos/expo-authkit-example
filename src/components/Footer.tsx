/**
 * Footer component with WorkOS branding.
 */
import { View, StyleSheet, Linking, Pressable } from 'react-native';
import { Text } from 'react-native-paper';

export function Footer(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text variant="bodySmall" style={styles.text}>
        Powered by{' '}
        <Pressable onPress={() => Linking.openURL('https://workos.com')}>
          <Text variant="bodySmall" style={styles.link}>
            WorkOS
          </Text>
        </Pressable>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  text: {
    opacity: 0.5,
  },
  link: {
    color: '#6366f1',
    textDecorationLine: 'underline',
  },
});

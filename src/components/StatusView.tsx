import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { colors, PAGE_PADDING } from '../theme';

export function LoadingView() {
  return (
    <View style={styles.center}>
      <ActivityIndicator color={colors.ink} />
    </View>
  );
}

type ErrorViewProps = { error: Error; onRetry: () => void };

export function ErrorView({ error, onRetry }: ErrorViewProps) {
  return (
    <View style={styles.center}>
      <Text style={styles.title}>Couldn’t load this</Text>
      <Text style={styles.message}>
        {error.message}. Is the backend running, and is BASE_URL correct?
      </Text>
      <Pressable
        accessibilityRole="button"
        onPress={onRetry}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Try again</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: PAGE_PADDING,
  },
  title: { fontSize: 16, fontWeight: '700', color: colors.ink },
  message: {
    marginTop: 6,
    fontSize: 13,
    lineHeight: 18,
    textAlign: 'center',
    color: colors.muted,
  },
  button: {
    height: 44,
    marginTop: 16,
    paddingHorizontal: 24,
    borderRadius: 22,
    backgroundColor: colors.lime,
    justifyContent: 'center',
  },
  buttonText: { fontSize: 14, fontWeight: '700', color: colors.ink },
});

import { StyleSheet, Text } from 'react-native';
import { colors } from '../theme';

export function Rating({ value }: { value?: number }) {
  if (value == null) {
    return null;
  }
  return <Text style={styles.rating}>★ {value.toFixed(1)}</Text>;
}

const styles = StyleSheet.create({
  rating: { fontSize: 13, fontWeight: '700', color: colors.green },
});

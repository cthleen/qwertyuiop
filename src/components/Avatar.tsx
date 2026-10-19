import { Image, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

type Props = { uri: string | null; name: string; size: number };

export function Avatar({ uri, name, size }: Props) {
  const circle = { width: size, height: size, borderRadius: size / 2 };

  return uri ? (
    <Image source={{ uri }} style={[styles.circle, circle]} />
  ) : (
    <View style={[styles.circle, styles.fallback, circle]}>
      <Text style={[styles.initial, { fontSize: size / 2.5 }]}>
        {name.charAt(0).toUpperCase()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: { backgroundColor: colors.surface },
  fallback: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lime,
  },
  initial: { fontWeight: '700', color: colors.ink },
});

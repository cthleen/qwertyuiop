import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../theme';

type Props = { label: string; active: boolean; onPress: () => void };

export function FilterTag({ label, active, onPress }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      onPress={onPress}
      style={[styles.tag, active && styles.tagActive]}
    >
      <Text style={[styles.label, active && styles.labelActive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tag: {
    height: 34,
    paddingHorizontal: 16,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.bg,
    justifyContent: 'center',
  },
  tagActive: { borderColor: colors.lime, backgroundColor: colors.lime },
  label: { fontSize: 13, fontWeight: '500', color: colors.ink },
  labelActive: { fontWeight: '700' },
});

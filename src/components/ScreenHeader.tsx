import { StyleSheet, Text, View } from 'react-native';
import { colors, PAGE_PADDING } from '../theme';

type Props = { title: string; subtitle?: string };

export function ScreenHeader({ title, subtitle }: Props) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: PAGE_PADDING, paddingTop: 22 },
  title: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '700',
    letterSpacing: -0.5,
    color: colors.ink,
  },
  subtitle: { marginTop: 8, fontSize: 13, lineHeight: 18, color: colors.muted },
});

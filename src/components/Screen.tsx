import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme';

type Props = { children: ReactNode; bottomInset?: boolean };

// Page container that keeps content clear of the status bar. Pass `bottomInset`
// on screens without a tab bar to also clear the home indicator.
export function Screen({ children, bottomInset = false }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.screen,
        {
          paddingTop: insets.top,
          paddingBottom: bottomInset ? insets.bottom : 0,
        },
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
});

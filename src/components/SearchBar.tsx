import {
  type StyleProp,
  StyleSheet,
  TextInput,
  View,
  type ViewStyle,
} from 'react-native';
import { colors } from '../theme';
import { Icon } from './Icon';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  style?: StyleProp<ViewStyle>;
};

export function SearchBar({ value, onChangeText, style }: Props) {
  return (
    <View style={[styles.bar, style]}>
      <Icon name="search" size={20} color={colors.muted} />
      <TextInput
        autoCorrect={false}
        onChangeText={onChangeText}
        placeholder="Search destinations"
        placeholderTextColor={colors.muted}
        returnKeyType="search"
        style={styles.input}
        value={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: 46,
    paddingHorizontal: 14,
    borderRadius: 23,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginLeft: 10,
    padding: 0,
    fontSize: 14,
    color: colors.ink,
  },
});

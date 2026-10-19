import {
  Pressable,
  type StyleProp,
  StyleSheet,
  type ViewStyle,
} from 'react-native';
import type { Place } from '../api';
import { useFavorites } from '../favorites';
import { colors } from '../theme';
import { Icon } from './Icon';

type Props = { place: Place; style?: StyleProp<ViewStyle> };

export function FavoriteButton({ place, style }: Props) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const saved = isFavorite(place.id);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={saved ? 'Remove from favorites' : 'Add to favorites'}
      hitSlop={8}
      onPress={() => toggleFavorite(place)}
      style={[styles.button, style]}
    >
      <Icon
        name="heart"
        size={18}
        color={saved ? colors.red : colors.ink}
        fill={saved ? colors.red : 'none'}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.lime,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

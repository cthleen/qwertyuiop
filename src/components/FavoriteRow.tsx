import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import type { Place } from '../api';
import { colors } from '../theme';
import { FavoriteButton } from './FavoriteButton';

type Props = { place: Place; onPress: () => void };

// The heart is a sibling of the Pressable, not a child, so screen readers and
// touches treat the two controls separately.
export function FavoriteRow({ place, onPress }: Props) {
  return (
    <View style={styles.row}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={place.title}
        onPress={onPress}
        style={styles.main}
      >
        {place.imageUrl ? (
          <Image source={{ uri: place.imageUrl }} style={styles.thumb} />
        ) : (
          <View style={styles.thumb} />
        )}
        <View style={styles.text}>
          <Text style={styles.title} numberOfLines={1}>
            {place.title}
          </Text>
          <Text style={styles.location} numberOfLines={1}>
            {place.location}
          </Text>
          <Text style={styles.category}>{place.category}</Text>
        </View>
      </Pressable>
      <FavoriteButton place={place} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  main: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  thumb: {
    width: 88,
    height: 100,
    borderRadius: 16,
    backgroundColor: colors.surface,
  },
  text: { flex: 1, marginHorizontal: 16 },
  title: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '700',
    color: colors.ink,
  },
  location: {
    marginTop: 6,
    fontSize: 13,
    lineHeight: 16,
    color: colors.muted,
  },
  category: {
    marginTop: 6,
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '500',
    color: colors.green,
  },
});

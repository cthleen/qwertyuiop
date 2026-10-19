import {
  Image,
  Pressable,
  type StyleProp,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  type ViewStyle,
} from 'react-native';
import type { Place } from '../api';
import { colors, GRID_GAP, PAGE_PADDING } from '../theme';
import { FavoriteButton } from './FavoriteButton';
import { Rating } from './Rating';

type Props = {
  place: Place;
  onPress: () => void;
  featured?: boolean;
  style?: StyleProp<ViewStyle>;
};

// Compact cards are sized for a two-column grid; a featured card fills the row.
export function DestinationCard({
  place,
  onPress,
  featured = false,
  style,
}: Props) {
  const { width } = useWindowDimensions();
  const columnWidth = (width - PAGE_PADDING * 2 - GRID_GAP) / 2;
  const meta = `${place.location} · ${place.category}`;

  // The heart is a sibling of the Pressable, not a child, so screen readers
  // and touches treat the two controls separately.
  return (
    <View style={[!featured && { width: columnWidth }, style]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={place.title}
        onPress={onPress}
      >
        <View style={[styles.photo, featured && styles.photoFeatured]}>
          {place.imageUrl ? (
            <Image
              source={{ uri: place.imageUrl }}
              style={StyleSheet.absoluteFill}
            />
          ) : null}
          {featured ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>EDITOR’S PICK</Text>
            </View>
          ) : null}
        </View>
        {featured ? (
          <View style={styles.featuredCaption}>
            <View style={styles.featuredText}>
              <Text style={styles.featuredTitle} numberOfLines={1}>
                {place.title}
              </Text>
              <Text style={styles.featuredMeta} numberOfLines={1}>
                {meta}
              </Text>
            </View>
            <Rating value={place.rating} />
          </View>
        ) : (
          <>
            <Text style={styles.title} numberOfLines={1}>
              {place.title}
            </Text>
            <Text style={styles.meta} numberOfLines={1}>
              {meta}
            </Text>
          </>
        )}
      </Pressable>
      <FavoriteButton
        place={place}
        style={[styles.heart, featured && styles.heartFeatured]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  photo: {
    aspectRatio: 164 / 158,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: colors.surface,
  },
  photoFeatured: { aspectRatio: 3 / 2, borderRadius: 24 },
  heart: { position: 'absolute', top: 10, right: 10 },
  heartFeatured: { top: 14, right: 14 },
  badge: {
    position: 'absolute',
    top: 14,
    left: 14,
    height: 26,
    paddingHorizontal: 12,
    borderRadius: 13,
    backgroundColor: colors.lime,
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
    color: colors.ink,
  },
  title: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '700',
    color: colors.ink,
  },
  meta: { marginTop: 3, fontSize: 11, lineHeight: 14, color: colors.muted },
  featuredCaption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  featuredText: { flex: 1, marginRight: 12 },
  featuredTitle: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '700',
    color: colors.ink,
  },
  featuredMeta: {
    marginTop: 4,
    fontSize: 13,
    lineHeight: 16,
    color: colors.muted,
  },
});

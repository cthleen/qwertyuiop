import { useNavigation } from '@react-navigation/native';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { FavoriteRow } from '../components/FavoriteRow';
import { Screen } from '../components/Screen';
import { ScreenHeader } from '../components/ScreenHeader';
import { useFavorites } from '../favorites';
import { colors, PAGE_PADDING } from '../theme';

export default function FavoritesScreen() {
  const navigation = useNavigation();
  const { favorites } = useFavorites();
  const count = favorites.length;

  return (
    <Screen>
      <FlatList
        data={favorites}
        keyExtractor={place => place.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <FavoriteRow
            place={item}
            onPress={() => navigation.navigate('Detail', { id: item.id })}
          />
        )}
        ListHeaderComponent={
          <View>
            <ScreenHeader
              title="Favorites"
              subtitle="Beautiful places, kept for later."
            />
            <Text style={styles.count}>
              {`${count} SAVED PLACE${count === 1 ? '' : 'S'}`}
            </Text>
          </View>
        }
        ListEmptyComponent={
          <Text style={styles.empty}>
            Tap the heart on a place to save it here.
          </Text>
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: { paddingBottom: PAGE_PADDING },
  count: {
    marginTop: 28,
    marginBottom: 2,
    paddingHorizontal: PAGE_PADDING,
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '700',
    letterSpacing: 1,
    color: colors.muted,
  },
  empty: {
    paddingTop: 16,
    paddingHorizontal: PAGE_PADDING,
    fontSize: 13,
    lineHeight: 18,
    color: colors.muted,
  },
});

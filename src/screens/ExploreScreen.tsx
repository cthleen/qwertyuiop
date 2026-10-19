import { useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text } from 'react-native';
import { getCategories, getPlaces } from '../api';
import { DestinationCard } from '../components/DestinationCard';
import { FilterTag } from '../components/FilterTag';
import { Screen } from '../components/Screen';
import { ScreenHeader } from '../components/ScreenHeader';
import { SearchBar } from '../components/SearchBar';
import { ErrorView, LoadingView } from '../components/StatusView';
import { colors, GRID_GAP, PAGE_PADDING } from '../theme';
import { useFetch } from '../useFetch';

export default function ExploreScreen() {
  const navigation = useNavigation();
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string | null>(null);

  // Wait for typing to pause before asking the backend.
  useEffect(() => {
    const timer = setTimeout(() => setSearch(query.trim()), 400);
    return () => clearTimeout(timer);
  }, [query]);

  const categories = useFetch(getCategories);
  const fetchPlaces = useCallback(
    () => getPlaces({ q: search, category }),
    [search, category],
  );
  const places = useFetch(fetchPlaces);

  const tags = [{ id: null, label: 'All' }, ...(categories.data ?? [])];

  let results;
  if (places.data) {
    results = (
      <FlatList
        data={places.data}
        keyExtractor={place => place.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.grid}
        keyboardShouldPersistTaps="handled"
        style={places.loading && styles.dim}
        renderItem={({ item }) => (
          <DestinationCard
            place={item}
            onPress={() => navigation.navigate('Detail', { id: item.id })}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No destinations found.</Text>
        }
      />
    );
  } else if (places.error) {
    results = <ErrorView error={places.error} onRetry={places.reload} />;
  } else {
    results = <LoadingView />;
  }

  return (
    <Screen>
      <ScreenHeader
        title="Explore Indonesia"
        subtitle="Find a place that feels like you."
      />
      <SearchBar value={query} onChangeText={setQuery} style={styles.search} />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        style={styles.tags}
        contentContainerStyle={styles.tagsContent}
      >
        {tags.map(tag => (
          <FilterTag
            key={tag.id ?? 'all'}
            label={tag.label}
            active={tag.id === category}
            onPress={() => setCategory(tag.id)}
          />
        ))}
      </ScrollView>
      {results}
    </Screen>
  );
}

const styles = StyleSheet.create({
  search: { marginTop: 20, marginHorizontal: PAGE_PADDING },
  tags: { flexGrow: 0, marginTop: 20 },
  tagsContent: { paddingHorizontal: PAGE_PADDING, gap: 8 },
  grid: {
    paddingHorizontal: PAGE_PADDING,
    paddingTop: 20,
    paddingBottom: PAGE_PADDING,
  },
  row: { gap: GRID_GAP, marginBottom: 18 },
  dim: { opacity: 0.5 },
  empty: {
    paddingVertical: 32,
    textAlign: 'center',
    fontSize: 13,
    color: colors.muted,
  },
});

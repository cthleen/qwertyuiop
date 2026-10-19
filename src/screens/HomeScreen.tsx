import { useNavigation } from '@react-navigation/native';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { getHome } from '../api';
import { Avatar } from '../components/Avatar';
import { DestinationCard } from '../components/DestinationCard';
import { Screen } from '../components/Screen';
import { ErrorView, LoadingView } from '../components/StatusView';
import { colors, GRID_GAP, PAGE_PADDING } from '../theme';
import { useFetch } from '../useFetch';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { data, error, reload } = useFetch(getHome);

  if (!data) {
    return (
      <Screen>
        {error ? <ErrorView error={error} onRetry={reload} /> : <LoadingView />}
      </Screen>
    );
  }

  const [profile, pick, recent] = data;
  const open = (id: string) => navigation.navigate('Detail', { id });

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>A sunny hello,</Text>
            <Text style={styles.name}>{profile.name}</Text>
          </View>
          <Avatar uri={profile.imageUrl} name={profile.name} size={44} />
        </View>
        <Text style={styles.headline}>Somewhere beautiful.</Text>
        <Text style={styles.subtitle}>
          Your daily dose of travel inspiration.
        </Text>
        {pick ? (
          <DestinationCard
            featured
            place={pick}
            onPress={() => open(pick.id)}
            style={styles.featured}
          />
        ) : null}
        <Text style={styles.section}>Recently Viewed</Text>
        {recent.length ? (
          <View style={styles.recent}>
            {recent.map(place => (
              <DestinationCard
                key={place.id}
                place={place}
                onPress={() => open(place.id)}
              />
            ))}
          </View>
        ) : (
          <Text style={styles.empty}>Places you open will show up here.</Text>
        )}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: PAGE_PADDING,
    paddingTop: 15,
    paddingBottom: PAGE_PADDING,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  greeting: { fontSize: 13, lineHeight: 16, color: colors.muted },
  name: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '700',
    color: colors.ink,
  },
  headline: {
    marginTop: 21,
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '700',
    letterSpacing: -0.5,
    color: colors.ink,
  },
  subtitle: {
    marginTop: 10,
    fontSize: 13,
    lineHeight: 16,
    color: colors.muted,
  },
  featured: { marginTop: 24 },
  section: {
    marginTop: 20,
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '700',
    color: colors.ink,
  },
  recent: { flexDirection: 'row', gap: GRID_GAP, marginTop: 12 },
  empty: { marginTop: 12, fontSize: 13, lineHeight: 18, color: colors.muted },
});

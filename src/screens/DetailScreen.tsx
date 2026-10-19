import {
  type StaticScreenProps,
  useNavigation,
} from '@react-navigation/native';
import { useCallback } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getPlace } from '../api';
import { Icon } from '../components/Icon';
import { Rating } from '../components/Rating';
import { ErrorView, LoadingView } from '../components/StatusView';
import { colors, PAGE_PADDING } from '../theme';
import { useFetch } from '../useFetch';

type Props = StaticScreenProps<{ id: string }>;

export default function DetailScreen({ route }: Props) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const { id } = route.params;
  const fetchPlace = useCallback(() => getPlace(id), [id]);
  const { data: place, error, reload } = useFetch(fetchPlace);
  const heroHeight = Math.round(height * 0.68);

  let content;
  if (place) {
    content = (
      <ScrollView
        bounces={false}
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
      >
        {place.imageUrl ? (
          <Image
            source={{ uri: place.imageUrl }}
            style={[styles.hero, { height: heroHeight }]}
          />
        ) : (
          <View style={[styles.hero, { height: heroHeight }]} />
        )}
        <View
          style={[
            styles.sheet,
            { paddingBottom: insets.bottom + PAGE_PADDING },
          ]}
        >
          <View style={styles.sheetHeader}>
            <Text style={styles.location}>{place.location}</Text>
            <Rating value={place.rating} />
          </View>
          <Text style={styles.description}>{place.description}</Text>
        </View>
      </ScrollView>
    );
  } else if (error) {
    content = <ErrorView error={error} onRetry={reload} />;
  } else {
    content = <LoadingView />;
  }

  return (
    <View style={styles.screen}>
      {content}
      <View style={[styles.topBar, { top: insets.top + 21 }]}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={() => navigation.goBack()}
          style={styles.back}
        >
          <Icon name="arrow-left" />
        </Pressable>
        {place ? (
          <View style={styles.titlePill}>
            <Text style={styles.titleText} numberOfLines={1}>
              {place.title}
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  hero: { width: '100%', backgroundColor: colors.surface },
  sheet: {
    marginTop: -24,
    paddingTop: 22,
    paddingHorizontal: PAGE_PADDING,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: colors.bg,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  location: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '700',
    color: colors.ink,
  },
  description: {
    marginTop: 8,
    fontSize: 13,
    lineHeight: 18,
    color: colors.muted,
  },
  topBar: {
    position: 'absolute',
    left: 16,
    right: 16,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  back: {
    position: 'absolute',
    left: 0,
    width: 52,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.lime,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titlePill: {
    height: 48,
    marginHorizontal: 60,
    paddingHorizontal: 18,
    borderRadius: 24,
    backgroundColor: colors.lime,
    justifyContent: 'center',
  },
  titleText: { fontSize: 16, fontWeight: '500', color: colors.ink },
});

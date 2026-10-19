import { useNavigation } from '@react-navigation/native';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { getOnboarding } from '../api';
import { Icon } from '../components/Icon';
import { Screen } from '../components/Screen';
import { colors, PAGE_PADDING } from '../theme';
import { useFetch } from '../useFetch';

export default function WelcomeScreen() {
  const navigation = useNavigation();
  // A random place from the backend. The screen still works if it fails.
  const { data: place } = useFetch(getOnboarding);

  return (
    <Screen bottomInset>
      <View style={styles.photo}>
        {place?.imageUrl ? (
          <Image
            source={{ uri: place.imageUrl }}
            style={StyleSheet.absoluteFill}
          />
        ) : null}
        {place ? (
          <View style={styles.label}>
            <Text style={styles.labelText}>{place.title}</Text>
          </View>
        ) : null}
      </View>
      <View style={styles.content}>
        <Text style={styles.eyebrow}>A LITTLE TRAVEL INSPIRATION</Text>
        <Text style={styles.title}>{'Find your own\nkind of paradise.'}</Text>
        <Text style={styles.subtitle}>
          Beautiful corners of Indonesia, handpicked for your next daydream.
        </Text>
        <Pressable
          accessibilityRole="button"
          onPress={() =>
            navigation.reset({ index: 0, routes: [{ name: 'Tabs' }] })
          }
          style={styles.button}
        >
          <Text style={styles.buttonText}>Let’s explore</Text>
          <Icon name="arrow-right" />
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  photo: {
    flex: 1,
    marginHorizontal: 16,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: colors.surface,
  },
  label: {
    position: 'absolute',
    left: 16,
    bottom: 19,
    height: 29,
    paddingHorizontal: 12,
    borderRadius: 15,
    backgroundColor: colors.bg,
    justifyContent: 'center',
  },
  labelText: { fontSize: 13, fontWeight: '500', color: colors.ink },
  content: {
    paddingHorizontal: PAGE_PADDING,
    paddingTop: 26,
    paddingBottom: 40,
  },
  eyebrow: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '700',
    letterSpacing: 0.6,
    color: colors.green,
  },
  title: {
    marginTop: 12,
    fontSize: 38,
    lineHeight: 42,
    fontWeight: '700',
    letterSpacing: -0.8,
    color: colors.ink,
  },
  subtitle: {
    marginTop: 12,
    fontSize: 14,
    lineHeight: 22,
    color: colors.muted,
  },
  button: {
    height: 54,
    marginTop: 26,
    paddingHorizontal: 22,
    borderRadius: 27,
    backgroundColor: colors.lime,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonText: { fontSize: 16, fontWeight: '700', color: colors.ink },
});

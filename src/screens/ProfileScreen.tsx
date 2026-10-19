import { StyleSheet, Text, View } from 'react-native';
import { getProfile } from '../api';
import { Avatar } from '../components/Avatar';
import { Screen } from '../components/Screen';
import { ScreenHeader } from '../components/ScreenHeader';
import { ErrorView, LoadingView } from '../components/StatusView';
import { colors } from '../theme';
import { useFetch } from '../useFetch';

export default function ProfileScreen() {
  const { data: profile, error, reload } = useFetch(getProfile);

  let body;
  if (profile) {
    body = (
      <View style={styles.body}>
        <Avatar uri={profile.imageUrl} name={profile.name} size={156} />
        <Text style={styles.name}>{profile.name}</Text>
      </View>
    );
  } else if (error) {
    body = <ErrorView error={error} onRetry={reload} />;
  } else {
    body = <LoadingView />;
  }

  return (
    <Screen>
      <ScreenHeader title="Profile" />
      {body}
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: { alignItems: 'center', marginTop: 139 },
  name: {
    marginTop: 22,
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '700',
    color: colors.ink,
  },
});

import {
  type BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View } from 'react-native';
import { Icon, type IconName } from '../components/Icon';
import ExploreScreen from '../screens/ExploreScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { colors } from '../theme';

const styles = StyleSheet.create({
  bar: { borderTopWidth: 1, paddingHorizontal: 11 },
  icon: { width: 50, height: 30 },
  pill: {
    width: 50,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillActive: { backgroundColor: colors.lime },
  label: { marginTop: 3, fontSize: 10 },
  labelActive: { fontWeight: '700' },
});

// The active tab's icon sits on a lime pill and its label turns bold.
const tab = (icon: IconName): BottomTabNavigationOptions => ({
  tabBarIcon: ({ focused, color }) => (
    <View style={[styles.pill, focused && styles.pillActive]}>
      <Icon name={icon} color={color} />
    </View>
  ),
  tabBarLabel: ({ focused, color, children }) => (
    <Text
      allowFontScaling={false}
      style={[styles.label, { color }, focused && styles.labelActive]}
    >
      {children}
    </Text>
  ),
});

export const Tabs = createBottomTabNavigator({
  screenOptions: {
    headerShown: false,
    tabBarActiveTintColor: colors.ink,
    tabBarInactiveTintColor: colors.muted,
    tabBarIconStyle: styles.icon,
    tabBarStyle: styles.bar,
  },
  screens: {
    Home: { screen: HomeScreen, options: tab('home') },
    Favorites: { screen: FavoritesScreen, options: tab('heart') },
    Explore: { screen: ExploreScreen, options: tab('compass') },
    Profile: { screen: ProfileScreen, options: tab('user') },
  },
});

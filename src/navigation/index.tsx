import { createStaticNavigation, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailScreen from '../screens/DetailScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import { colors } from '../theme';
import { Tabs } from './Tabs';

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Welcome',
  screenOptions: { headerShown: false },
  screens: {
    Welcome: WelcomeScreen,
    Tabs,
    Detail: DetailScreen,
  },
});

export const Navigation = createStaticNavigation(RootStack);

export const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.ink,
    background: colors.bg,
    card: colors.bg,
    text: colors.ink,
    border: colors.line,
  },
};

type RootStackType = typeof RootStack;

declare module '@react-navigation/native' {
  interface RootNavigator extends RootStackType {}
}

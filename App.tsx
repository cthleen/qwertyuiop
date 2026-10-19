import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FavoritesProvider } from './src/favorites';
import { Navigation, navigationTheme } from './src/navigation';

function App() {
  return (
    <SafeAreaProvider>
      <FavoritesProvider>
        <StatusBar barStyle="dark-content" />
        <Navigation theme={navigationTheme} />
      </FavoritesProvider>
    </SafeAreaProvider>
  );
}

export default App;

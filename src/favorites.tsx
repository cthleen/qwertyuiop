import { createAsyncStorage } from '@react-native-async-storage/async-storage';
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { Place } from './api';

// The backend has no favorites endpoint, so they live on the device.
const storage = createAsyncStorage('rntrainingfrontend');
const KEY = 'favorites';

type FavoritesValue = {
  favorites: Place[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (place: Place) => void;
};

const FavoritesContext = createContext<FavoritesValue | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Place[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    storage
      .getItem(KEY)
      .then(raw => raw && setFavorites(JSON.parse(raw)))
      .catch(console.warn)
      .finally(() => setReady(true));
  }, []);

  // Wait until the saved list is loaded so it is never overwritten with [].
  useEffect(() => {
    if (ready) {
      storage.setItem(KEY, JSON.stringify(favorites)).catch(console.warn);
    }
  }, [favorites, ready]);

  const value = useMemo<FavoritesValue>(
    () => ({
      favorites,
      isFavorite: id => favorites.some(place => place.id === id),
      toggleFavorite: place =>
        setFavorites(list =>
          list.some(p => p.id === place.id)
            ? list.filter(p => p.id !== place.id)
            : [place, ...list],
        ),
    }),
    [favorites],
  );

  return ready ? (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  ) : null;
}

export function useFavorites() {
  const value = useContext(FavoritesContext);
  if (!value) {
    throw new Error('useFavorites must be used inside FavoritesProvider');
  }
  return value;
}

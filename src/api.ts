import { Platform } from 'react-native';

// The Android emulator reaches your computer through 10.0.2.2. On a physical
// device, use your computer's LAN IP instead, e.g. http://192.168.1.10:3000
export const BASE_URL = Platform.select({
  android: 'http://10.0.2.2:3000',
  default: 'http://localhost:3000',
});

export type Place = {
  id: string;
  title: string;
  location: string;
  category: string;
  categoryId: string;
  imageUrl: string | null;
  description: string;
  rating?: number;
};

export type Category = { id: string; label: string };

export type Profile = { name: string; imageUrl: string | null };

async function get<T>(path: string): Promise<T> {
  const response = await fetch(BASE_URL + path);
  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
  }
  return response.json();
}

const queryString = (
  params: Record<string, string | number | null | undefined>,
) =>
  Object.entries(params)
    .filter(([, value]) => value != null && value !== '')
    .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
    .join('&');

// The backend returns 10 places per page by default. One request with a big
// limit covers its whole dataset.
const PLACES_LIMIT = 100;

export const getPlaces = (filters: { q?: string; category?: string | null }) =>
  get<{ data: Place[] }>(
    `/places?${queryString({ ...filters, limit: PLACES_LIMIT })}`,
  ).then(result => result.data);

export const getPlace = (id: string) =>
  get<Place>(`/places/${encodeURIComponent(id)}`);

export const getCategories = () => get<Category[]>('/categories');

export const getProfile = () => get<Profile>('/profile');

export const getEditorsPick = () => get<Place | null>('/editors-pick');

export const getOnboarding = () => get<Place | null>('/onboarding');

export async function getRecentlyViewed() {
  const items = await get<{ place: Place | null }[]>('/recently-viewed');
  const places = items.flatMap(item => (item.place ? [item.place] : []));
  // Opening the same place twice lists it twice.
  return places.filter(
    (place, index) => places.findIndex(p => p.id === place.id) === index,
  );
}

export const getHome = () =>
  Promise.all([getProfile(), getEditorsPick(), getRecentlyViewed()]);

import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useRef, useState } from 'react';

type State<T> = { data?: T; error?: Error; loading: boolean };

// Runs `fetcher` when the screen gains focus and whenever `fetcher` changes,
// so keep it stable (module-level function or useCallback). Only the latest
// request updates state, and old data stays visible while refreshing.
export function useFetch<T>(fetcher: () => Promise<T>) {
  const [state, setState] = useState<State<T>>({ loading: true });
  const latest = useRef(0);

  const load = useCallback(() => {
    const request = ++latest.current;
    setState(prev => ({ data: prev.data, loading: true }));
    fetcher().then(
      data => request === latest.current && setState({ data, loading: false }),
      error =>
        request === latest.current &&
        setState(prev => ({ data: prev.data, error, loading: false })),
    );
  }, [fetcher]);

  useFocusEffect(load);

  return { ...state, reload: load };
}

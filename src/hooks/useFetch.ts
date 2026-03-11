import { useCallback, useEffect, useReducer, useRef, useState } from 'react';

interface State<T> {
  data?: T;
  error?: Error;
  refetch: () => void;
}

type Action<T> =
  | { type: 'loading' }
  | { type: 'fetched'; payload: T }
  | { type: 'error'; payload: Error };

function useFetch<T = unknown>(url?: string, options?: RequestInit): State<T> {
  const cancelRequest = useRef<boolean>(false);
  const [trigger, setTrigger] = useState(0);

  const refetch = useCallback(() => {
    setTrigger((prev) => prev + 1);
  }, []);

  const initialState: Omit<State<T>, 'refetch'> = {
    error: undefined,
    data: undefined,
  };

  const fetchReducer = (
    state: Omit<State<T>, 'refetch'>,
    action: Action<T>,
  ): Omit<State<T>, 'refetch'> => {
    switch (action.type) {
      case 'loading':
        return { ...initialState };
      case 'fetched':
        return { ...initialState, data: action.payload };
      case 'error':
        return { ...initialState, error: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    if (!url) return;

    cancelRequest.current = false;

    const fetchData = async () => {
      dispatch({ type: 'loading' });

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = (await response.json()) as T;
        if (cancelRequest.current) return;

        dispatch({ type: 'fetched', payload: data });
      } catch (error) {
        if (cancelRequest.current) return;

        dispatch({ type: 'error', payload: error as Error });
      }
    };

    void fetchData();

    return () => {
      cancelRequest.current = true;
    };
  }, [url, options, trigger]);

  return { ...state, refetch };
}

export default useFetch;

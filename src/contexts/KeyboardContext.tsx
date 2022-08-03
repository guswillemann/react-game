import { createContext, FC, ReactNode, useCallback, useEffect, useRef } from 'react';
import { KeyboardAction } from '../types';

type KeyboardValues = {
  subscribe: (key: KeyboardEvent['key'], action: () => void) => void;
  unsubscribe: (key: KeyboardEvent['key'], action: () => void) => void;
};

type KeyboardActionsMap = Record<KeyboardEvent['key'], Set<KeyboardAction>>;

export const KeyboardContext = createContext({} as KeyboardValues);

type Props = {
  children: ReactNode;
};

const KeyboardProvider: FC<Props> = ({ children }) => {
  const keyboardActionsMap = useRef<KeyboardActionsMap>({});

  const subscribe = useCallback<KeyboardValues['subscribe']>((key, action) => {
    if (!keyboardActionsMap.current[key]) {
      keyboardActionsMap.current[key] = new Set();
    }
    keyboardActionsMap.current[key].add(action);
  }, []);

  const unsubscribe = useCallback<KeyboardValues['unsubscribe']>((key, action) => {
    if (!keyboardActionsMap.current[key]) return;
    keyboardActionsMap.current[key].delete(action);
  }, []);

  useEffect(() => {
    const callback = (e: KeyboardEvent) => {
      keyboardActionsMap.current[e.key]?.forEach((action) => action());
    };

    document.addEventListener('keydown', callback);
    return () => document.removeEventListener('keydown', callback);;
  }, []);

  return (
    <KeyboardContext.Provider value={{
      subscribe,
      unsubscribe,
    }}>
      {children}
    </KeyboardContext.Provider>
  );
};

export default KeyboardProvider;

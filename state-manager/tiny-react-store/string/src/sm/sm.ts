import React from 'react';
import { Subject } from './subject.js';

type Store<T extends object> = keyof T extends never
  ? never
  : {
      [K in keyof T]: Subject<T[K]>;
    };

export const createStore = <T extends object>(initData: T) => {
  const store = {} as Store<T>;
  for (const key in initData) {
    const typedKey = key as keyof T;
    store[typedKey] = new Subject(
      initData[key]
    ) as unknown as Store<T>[keyof T];
  }

  const useStore = <K extends keyof T>(key: K): T[K] => {
    const [value, setValue] = React.useState<T[K]>(store[key].value as T[K]);
    React.useEffect(() => {
      (store[key] as unknown as Subject<T[K]>).subscribe(setValue);
      return () => {
        (store[key] as unknown as Subject<T[K]>).unsubscribe(setValue);
      };
    }, [setValue, key]);

    return value;
  };

  return { useStore, store };
};

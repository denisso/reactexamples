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

  const useStore = <R>(selector: (store: Store<T>) => Subject<R>): R => {
    const [value, setValue] = React.useState<R>(selector(store).value);
    const init = React.useRef(false);

    React.useEffect(() => {
      const prop = selector(store);

      prop.subscribe(setValue, init.current);
      init.current = true;

      return () => {
        prop.unsubscribe(setValue);
      };
    }, [selector]);

    return value;
  };

  return { useStore, store };
};

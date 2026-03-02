import React from 'react';
import { Store } from './store';

/**
 * Subscribes a component to a single store field by key.
 *
 * Returns:
 * - analog [value, setValue] = React.useState
 *
 * @param store - Store<T> | IContextValueId<Store<T>>
 * @param key - name field in the store
 */
export function useState<T extends object>(store: Store<T>): T {
  const [args] = React.useState(() => {
    return {
      getSnapshot() {
        return store.state;
      },

      subscribe: store.subscribe,
    };
  });
  const state = React.useSyncExternalStore(args.subscribe, args.getSnapshot);
  return state;
}

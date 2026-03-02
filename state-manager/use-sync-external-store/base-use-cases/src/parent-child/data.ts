import { Store } from './api';

export const ids = new Store<{ ids: number[] }>({ ids: Array(10) });

type Counter = { count: number };
export const dict = ids.state.ids.reduce<Record<number, Store<Counter>>>(
  (a, e) => {
    a[e] = new Store({ count: 0 });
    return a;
  },
  {}
);

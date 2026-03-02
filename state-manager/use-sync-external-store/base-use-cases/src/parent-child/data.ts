import { Store, createContextId } from './api';

export const ids = new Store<{ ids: number[] }>({
  ids: Array.from({ length: 10 }, (_, i) => i),
});

type Counter = { count: number };

export const dictId = createContextId<Store<Counter>>();

export const dict = ids.state.ids.reduce<Record<number, Store<Counter>>>(
  (a, e) => {
    a[e] = new Store({ count: 0 });
    return a;
  },
  {}
);

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

export const reCreateCounters = (length: number) => {
  if (ids.state.ids.length > length) {
    for (let i = length - 1; i < ids.state.ids.length; i++) {
      delete dict[i];
    }
  } else if (ids.state.ids.length < length) {
    for (let i = ids.state.ids.length; i < length; i++) {
      dict[i] = new Store({ count: 0 });
    }
  }
  ids.set({ ids: Array.from({ length }, (_, i) => i) });
};

export const updateAnpPlusOne = () => {
  for (const id of ids.state.ids) {
    dict[id].state = { count: dict[id].state.count + 1 };
    for (const listener of dict[id].listeners) {
      listener();
    }
  }
};

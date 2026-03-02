import React from 'react';
import type { IContext, IContextValueId } from './types';

export function createContextId<T extends object>(
  name?: string
): IContextValueId<T> {
  return Symbol(name) as IContextValueId<T>;
}

export const Context = React.createContext<IContext>(
  null as unknown as IContext
);

type Props = {
  children: React.ReactNode;
  value: Record<symbol, {}>;
};

export const Provider = ({ children, value }: Props) => {
  const [context] = React.useState<IContext>(() => {
    const _context: IContext = {};
    const storeIds = Object.getOwnPropertySymbols(value);
    for (const id of storeIds) {
      _context[id] = value[id];
    }
    return _context;
  });

  return <Context.Provider value={context}>{children}</Context.Provider>;
};

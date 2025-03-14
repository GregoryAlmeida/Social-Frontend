'use client';
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from 'react';

type IContext = {
  state: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
};

export const Context = createContext<IContext>({} as IContext);

export const ContextProvider = ({ children }: PropsWithChildren) => {
  const [state, setState] = useState(true);

  return (
    <Context.Provider value={{ state, setState }}>{children}</Context.Provider>
  );
};

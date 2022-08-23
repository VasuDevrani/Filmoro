import React, { createContext, useReducer } from "react";
import { movie } from "./interfaces/movie";

type ContextState = {
  movies: movie[];
  loading: boolean;
  error: boolean;
};

const initalState = {
  movies: [],
  loading: true,
  error: false,
};

export const Store = createContext(
  {} as { state: ContextState; dispatch: React.Dispatch<ContextActions> }
);

export type ContextActions =
  | { type: "START_ADD" }
  | { type: "ADD_MOVIES"; payload: movie[] }
  | { type: "FAIL_ADD" };

export const Reducer = (state: ContextState, action: ContextActions) => {
  switch (action.type) {
    case "START_ADD":
      return { ...state, loading: true, error: false };
    case "ADD_MOVIES":
      return { ...state, loading: false, movies: action.payload, error: false };
    case "FAIL_ADD":
      return { ...state, loading: false, error: true };
  }
};

type ContextProps = {
  children: React.ReactNode;
};

const StateProvider = ({ children }: ContextProps) => {
  const [state, dispatch] = useReducer(Reducer, initalState);
  let props = { state, dispatch };
  return <Store.Provider value={props}>{children}</Store.Provider>;
};

export default StateProvider;

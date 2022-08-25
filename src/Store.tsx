import React, { createContext, useReducer } from "react";
import { movie } from "./interfaces/movie";

type ContextState = {
  movies: movie[];
  loading: boolean;
  error: boolean;
  darkMode: boolean;
  page: number;
  category: string;
  query: string;
  id: string;
};

const initalState = {
  movies: [],
  loading: true,
  error: false,
  darkMode: localStorage.getItem("Mode")
    ? localStorage.getItem("Mode") === "light"
      ? false
      : true
    : false,
  page: 1,
  category: "",
  query: "",
  id: "",
};

export const Store = createContext(
  {} as { state: ContextState; dispatch: React.Dispatch<ContextActions> }
);

export type ContextActions =
  | { type: "START_ADD" }
  | { type: "ADD_MOVIES"; payload: movie[] }
  | { type: "FAIL_ADD" }
  | { type: "CHANGE_MODE" }
  | { type: "NEXT_PAGE" }
  | { type: "PREV_PAGE" }
  | { type: "QUERY"; payload: string }
  | { type: "GET_GENRE_MOVIE"; payload: string }
  | { type: "GET_CATEGORY"; payload: string };

export const Reducer = (state: ContextState, action: ContextActions) => {
  switch (action.type) {
    case "START_ADD":
      return { ...state, loading: true, error: false };
    case "ADD_MOVIES":
      return { ...state, loading: false, movies: action.payload, error: false };
    case "FAIL_ADD":
      return { ...state, loading: false, error: true };
    case "CHANGE_MODE":
      localStorage.setItem("Mode", state.darkMode ? "light" : "dark");
      return { ...state, darkMode: !state.darkMode };
    case "NEXT_PAGE":
      if (state.page === 30) {
        return state;
      } else {
        return { ...state, page: state.page + 1 };
      }
    case "PREV_PAGE":
      if (state.page === 1) {
        return state;
      } else {
        return { ...state, page: state.page - 1 };
      }
    case "QUERY": //for search
      return { ...state, page: 1, query: action.payload, id: "", category: "" };
    case "GET_GENRE_MOVIE":
      return { ...state, page: 1, query: "", id: action.payload, category: "" };
    case "GET_CATEGORY":
      return { ...state, page: 1, query: "", id: "", category: action.payload };
    default:
      return state;
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

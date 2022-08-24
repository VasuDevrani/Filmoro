import { useEffect } from "react";
import "./App.css";
import Main from "./components/Main";
import { getMovies } from "./features/films";
import { useContext } from "react";
import { Store } from "./Store";

const App: React.FC = () => {
  const { state, dispatch } = useContext(Store);
  const { darkMode } = state;

  useEffect(() => {
    getMovies(dispatch);
  }, []);

  return (
    <div className={`App ${darkMode? 'dark bg-slate-900' : ''} overflow-x-hidden`}>
      <Main />
    </div>
  );
};

export default App;

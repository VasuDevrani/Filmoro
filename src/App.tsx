import { useEffect, useState } from "react";
import "./App.css";
import Main from "./components/Main";
import { getMovies } from "./features/films";
import { useContext } from "react";
import { Store } from "./Store";
import SideBar from "./components/Sidebar";

const App: React.FC = () => {
  const { state, dispatch } = useContext(Store);
  const { query, id, page, category, darkMode } = state;
  
  const [toggle, setToggle] = useState<boolean>(false);

  useEffect(() => {
    getMovies(dispatch, query, page, id, category);
  }, [query, id, page, category]);

  return (
    <div className={`App ${darkMode? 'dark bg-slate-900' : ''} overflow-x-hidden relative mid:flex`}>
      <SideBar show={toggle} setToggle={setToggle} />
      <Main show={toggle} setToggle={setToggle} />
    </div>
  );
};

export default App;

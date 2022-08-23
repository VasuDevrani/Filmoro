import { useEffect } from "react";
import "./App.css";
import Main from "./components/Main";
import SideBar from "./components/Sidebar";
import { getMovies}  from "./features/films";
import { useContext } from "react";
import { Store } from "./Store";

const App: React.FC = () => {
  const { dispatch } = useContext(Store);

  useEffect(() => {
    getMovies(dispatch);
  }, []);
  
  return (
    <div className="App dark:bg-slate-900 overflow-x-hidden">
      <Main />
    </div>
  );
};

export default App;

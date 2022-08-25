import { IconButton } from "@mui/material";
import React, { useContext, useRef, useState } from "react";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import SearchIcon from "@mui/icons-material/Search";
import { Store } from "../Store";
import { getMovies } from "../features/films";
import { Route, Routes, useNavigate } from "react-router-dom";
import Cast from "./Cast";
import MovieDetails from "./MovieDetails";
import MovieList from "./MovieList";
import Loading from "./Loading";

interface Props{
  show: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>
}

function Main({show, setToggle}: Props){
  const { state, dispatch } = useContext(Store);
  const { loading, error, darkMode } = state;
  const navigate = useNavigate();
  const search = useRef<HTMLInputElement | null>(null);

  const [query, setQuery] = useState<string>("");

  const handleKeyPress = (e: React.KeyboardEvent) => {
    e.preventDefault();
    if (e.key === "Enter") {
      handleDispatch();
      navigate("/");
    }
  };

  const handleDispatch = () => {
    dispatch({type: "QUERY", payload: query})
    search.current?.blur();
    navigate("/");
    setQuery("");
  };

  const handleClick = () => {
    dispatch({type: 'CHANGE_MODE'});
  };

  return (
    <div className="flex-1">
      <div className="main mid:flex-1 h-[100vh] overflow-scroll overflow-x-hidden font-roboto">
        {/* navbar */}
        <div className="navbar sticky top-0 z-50 flex flex-row justify-between items-center p-5 bg-sitePink dark:bg-siteGrey">
          <div className="text-white text-2xl">
            <IconButton
              sx={{ ml: 1 }}
              color="inherit"
              onClick={handleClick}
            >
              {!darkMode ? <Brightness7Icon /> : <Brightness4Icon/>}
            </IconButton>
          </div>
          <div className="search flex">
            <input
              type="text"
              ref={search}
              className="bg-transparent outline-none text-white font-roboto border-b p-2 w-[8rem] md:w-[12rem]"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={handleKeyPress}
            />
            <IconButton color="warning" onClick={handleDispatch}>
              <SearchIcon sx={{ color: "white" }} />
            </IconButton>
            <div className="mid:hidden">
              <IconButton
                sx={{ ml: 1, color: "white" }}
                onClick={() => setToggle(!show)}
              >
                <MenuIcon />
              </IconButton>
            </div>
          </div>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <Routes>
            <Route path="/" element={<MovieList />} />
            <Route path="/cast/:id" element={<Cast />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        )}
      </div>
    </div>
  );
};

export default Main;

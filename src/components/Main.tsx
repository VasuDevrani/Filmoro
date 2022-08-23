import { IconButton } from "@mui/material";
import React, { useContext, useRef, useState } from "react";
// import Brightness4Icon from "@mui/icons-material/Brightness4";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import SearchIcon from "@mui/icons-material/Search";
import { Store } from "../Store";
import { getMovies } from "../features/films";
import SideBar from "./Sidebar";
import { Route, Routes, useNavigate } from "react-router-dom";
import Cast from "./Cast";
import MovieDetails from "./MovieDetails";
import MovieList from "./MovieList";
import Loading from "./Loading";

const Main: React.FC = () => {
  const { state, dispatch } = useContext(Store);
  const { loading, error } = state;
  const navigate = useNavigate();
  const search = useRef<HTMLInputElement | null>(null);

  const [query, setQuery] = useState<string>("");
  const [toggle, setToggle] = useState<boolean>(false);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    e.preventDefault();
    if (e.key === "Enter") {
      handleDispatch();
      navigate("/");
    }
  };

  const handleDispatch = () => {
    getMovies(dispatch, query);
    search.current?.blur();
    navigate("/");
    setQuery("");
  };

  const handleClick = () => {
    document.querySelector("#root")?.classList.toggle("dark");
  };

  return (
    <div className="relative mid:flex">
      <SideBar show={toggle} setToggle={setToggle} />
      <div className="main mid:flex-1 h-[100vh] overflow-scroll font-roboto">
        {/* navbar */}
        <div className="navbar sticky top-0 z-50 flex flex-row justify-between items-center p-5 bg-sitePink dark:bg-siteGrey">
          <div className="text-white text-2xl">
            <IconButton
              sx={{ ml: 1 }}
              color="inherit"
              onClick={handleClick}
            >
              <Brightness7Icon />
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
                onClick={() => setToggle(!toggle)}
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

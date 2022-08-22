import {
  CircularProgress,
  IconButton,
  InputBase,
  Paper,
  Rating,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
// import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import SearchIcon from "@mui/icons-material/Search";
import Divider from "@mui/material/Divider";
import { Store } from "../Store";

const Main: React.FC = () => {
  const { state } = useContext(Store);
  const { movies, loading, error } = state;

  return (
    <div className="main flex-1 h-[100vh] overflow-scroll font-roboto">
      {/* navbar */}
      <div className="navbar flex flex-row justify-between items-center p-5 bg-sitePink dark:bg-siteGrey">
        <div className="text-white text-2xl">
          <IconButton sx={{ ml: 1 }} color="inherit">
            <Brightness7Icon />
          </IconButton>
        </div>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search..."
            inputProps={{ "aria-label": "Search movies" }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        </Paper>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <CircularProgress size={"4rem"} color="secondary" />
        </div>
      ) : (
        <div className="movies p-10 px-24 grid md:grid-cols-10 grid-cols-11 gap-10">
          {movies.map((movie) => (
            <div className="flex flex-col justify-between items-center">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt=""
                className="object-contain rounded-3xl shadow-lg hover:scale-105 duration-300"
                loading="lazy"
              />
              <div className="text-area flex flex-col items-center justify-center">
                <h1 className="dark:text-white text-[1.4rem] py-2 font-medium">
                  {movie.title.length < 15
                    ? movie.title
                    : movie.title.slice(0, 16) + "..."}
                </h1>
                <Rating
                  name="simple-controlled"
                  value={movie.vote_average / 2}
                />
              </div>
            </div>
          ))}
        </div>
      )}
      {/* banner */}
      {/* movie area */}
    </div>
  );
};

export default Main;

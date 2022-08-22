import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import axios from "axios";
import { genres } from "../interfaces/movie";
import { CircularProgress } from "@mui/material";
import Categories from "./Categories";
import Genre from "./Genre";

const SideBar: React.FC = () => {
  const [genres, setGenres] = useState<genres[] | null>(null);

  useEffect(() => {
    const getGenres = async () => {
      try {
        setTimeout(async () => {
          const { data } = await axios.get(
            "https://api.themoviedb.org/3/genre/movie/list?api_key=9927d57067753126d627ab0540ed625a&language=en-US"
          );

          setGenres(data.genres);
        }, 1000);
      } catch (err) {
        console.log(err);
      }
    };
    getGenres();
  }, []);

  return (
    <div className="sidebar overflow-x-hidden hidden w-[16rem] mid:flex mid:flex-col h-[100vh] dark:bg-black overflow-scroll font-roboto dark:text-white">
      <img
        src={logo}
        alt="logo"
        className="w-3/5 py-5 pb-3 mx-auto -hue-rotate-60 dark:hue-rotate-0  cursor-pointer"
      />
      <hr className="w-[100%] bg-gray-700 my-2" />

      {/* categories */}
      <Categories/>
      <hr className="w-[100%] bg-gray-100" />

      {/* genres */}
      <div className="genres text-[1.1rem]">
        <p className=" text-gray-500 text-sm py-3 sticky top-0 bg-white dark:bg-black z-40 px-5">
          Genres
        </p>
        {genres ? (
          genres.map((genre: genres) => (
              <Genre name={genre.name} id={genre.id}/>
          ))
        ) : (
          <div className="flex justify-center items-center h-[20vh]">
            <CircularProgress size={"2rem"} color="secondary" />
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBar;

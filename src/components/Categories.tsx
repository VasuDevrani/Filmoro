import axios from "axios";
import React, { useContext } from "react";
import { BsFilm, BsStar, BsCameraReels } from "react-icons/bs";
import { Store } from "../Store";

export default function Categories() {
  const { dispatch } = useContext(Store);

  const handleClick = async (name: string) => {
    try {
      dispatch({ type: "START_ADD" });
      setTimeout(async () => {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${name}?api_key=9927d57067753126d627ab0540ed625a&language=en-US`
        );
        dispatch({ type: "ADD_MOVIES", payload: data.results });
      }, 1000);
    } catch (err) {
      dispatch({ type: "FAIL_ADD" });
      console.log(err);
    }
  };

  return (
    <div className="categories text-[1.1rem]">
      <p className=" text-gray-500 text-sm py-3 sticky top-0 bg-white dark:bg-black px-5 mb-2">
        Categories
      </p>
      <div className="grid grid-cols-1 grid-rows-3 gap-2 mb-2">
        <div
          className="text-2xl cursor-pointer flex flex-row gap-5 items-center hover:bg-slate-100 dark:hover:bg-slate-800 px-5 py-3"
          onClick={() => handleClick("popular")}
        >
          <BsFilm />
          <p className="col-span-3 cursor-pointer text-lg">Popular</p>
        </div>
        <div
          className="text-2xl cursor-pointer flex flex-row gap-5 items-center hover:bg-slate-100 dark:hover:bg-slate-800 px-5 py-3"
          onClick={() => handleClick("top_rated")}
        >
          <BsStar />
          <p className="col-span-3 cursor-pointer text-lg">Top Rated</p>
        </div>
        <div
          className="text-2xl cursor-pointer flex flex-row gap-5 items-center hover:bg-slate-100 dark:hover:bg-slate-800 px-5 py-3"
          onClick={() => handleClick("upcoming")}
        >
          <BsCameraReels />
          <p className="col-span-3 cursor-pointer text-lg">Upcoming</p>
        </div>
      </div>
    </div>
  );
}

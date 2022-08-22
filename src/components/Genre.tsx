import axios from "axios";
import React, { useContext } from "react";
import icons from "../assets/index";
import { Store } from "../Store";

type Props = {
  name: string;
  id: number;
};

export default function Genre({ name, id }: Props) {
  const { dispatch } = useContext(Store);

  const handleClick = async (genre: number) => {
    try {
      dispatch({ type: "START_ADD" });
      setTimeout(async () => {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=9927d57067753126d627ab0540ed625a&with_genres=${genre}`
        );
        dispatch({ type: "ADD_MOVIES", payload: data.results });
      });
    } catch (err) {
      dispatch({ type: "FAIL_ADD" });
      console.log(err);
    }
  };

  return (
    <div
      className="flex flex-row items-center gap-4 py-3 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 px-5 cursor-pointer"
      onClick={() => handleClick(id)}
    >
      <img
        src={icons[name.toLocaleLowerCase()]}
        alt="genreIcon"
        className="w-8 dark:invert"
      />
      <p>{name}</p>
    </div>
  );
}

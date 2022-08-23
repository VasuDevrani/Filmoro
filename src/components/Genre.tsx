import axios from "axios";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import icons from "../assets/index";
import { Store } from "../Store";

type Props = {
  name: string;
  id: number;
  show: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Genre({ name, id, show, setToggle }: Props) {
  const { dispatch } = useContext(Store);
  const navigate = useNavigate();

  const handleClick = async (genre: number) => {
    setToggle(!show);
    navigate("/");

    try {
      dispatch({ type: "START_ADD" });
      setTimeout(async () => {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=9927d57067753126d627ab0540ed625a&with_genres=${genre}`
        );
        dispatch({ type: "ADD_MOVIES", payload: data.results });
      }, 500);
    } catch (err) {
      dispatch({ type: "FAIL_ADD" });
      console.log(err);
    }
  };

  return (
    <div
      key={id}
      className="flex flex-row items-center gap-4 py-3 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 px-5 sm:px-12 mid:px-5 cursor-pointer"
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

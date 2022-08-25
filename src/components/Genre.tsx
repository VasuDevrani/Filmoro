import axios from "axios";
import React, { useContext, useState } from "react";
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

    dispatch({type: "GET_GENRE_MOVIE", payload: genre.toString()});
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

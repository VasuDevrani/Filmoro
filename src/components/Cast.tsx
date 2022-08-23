import { Rating, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { act } from "react-dom/test-utils";
import { BsArrowLeft } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getPerson, getPersonMovies } from "../features/films";
import { movie, personData } from "../interfaces/movie";

export default function Cast() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [load, setLoad] = useState<boolean>(true);
  const [actorData, setActorData] = useState<personData | null>(null);
  const [works, setWorks] = useState<movie[]>([]);

  useEffect(() => {
    setLoad(true);
    const getData = async () => {
      try {
        if (typeof id === "string") {
          let data = await getPerson(id);
          setActorData(data);

          data = await getPersonMovies(id);
          setWorks(data);
          setLoad(false);
        }
      } catch (err) {
        setLoad(false);
        console.log(err);
      }
    };

    getData();
  }, [id]);

  return (
    <div className="cast flex flex-col p-10 px-8 ">
      <div className="info flex flex-col gap-10 mid:flex-row justify-between mid:items-start items-center">
        <img
          src={
            actorData?.profile_path
              ? `https://image.tmdb.org/t/p/w500${actorData.profile_path}`
              : "https://dummyimage.com/200x300/fff/aaa"
          }
          alt=""
          className="w-[70%] mid:w-[35%] md:rounded-[50px] rounded-[30px] drop-shadow-4xl contrast-125"
          loading="lazy"
        />
        <div className="dark:text-white font-roboto px-3 flex flex-col items-start">
          <h1 className="text-5xl font-semibold my-4 leading-tight">
            {actorData?.name}
          </h1>
          <p className="text-2xl my-2 text-gray-600">Born: {actorData?.birthday}</p>
          <p className="my-3 mb-5">{actorData?.biography.slice(0, 1300)}...</p>
          <div className="util-btn w-28" onClick={() => navigate(-1)}>
            BACK <BsArrowLeft />
          </div>
        </div>
      </div>

      <div className="relatedMovies">
        <h1 className="text-3xl text-center uppercase text-semibold mt-10 dark:text-white">Related Movies</h1>
        <div className="movies p-10 md:px-24 sm:px-20 px-10 grid grid-cols-10 gap-10">
        {works.map((movie) => (
          <div
            key={movie.id}
            className="flex flex-col justify-between items-center"
          >
            <Link to={`/movie/${movie.id}`}>
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "https://dummyimage.com/200x300/fff/aaa"
                }
                alt=""
                className="object-contain cursor-pointer rounded-3xl shadow-lg hover:scale-105 duration-300"
                loading="lazy"
              />
            </Link>
            <div className="text-area flex flex-col items-center justify-center">
              <Link to={`/movie/${movie.id}`}>
                <h1 className="dark:text-white text-[1.4rem] py-2 font-medium cursor-pointer">
                  {movie.title.length < 15
                    ? movie.title
                    : movie.title.slice(0, 16) + "..."}
                </h1>
              </Link>
              <Tooltip
                disableTouchListener
                title={`${movie.vote_average} / 10`}
              >
                <Rating
                  readOnly
                  value={movie.vote_average / 2}
                  precision={0.1}
                />
              </Tooltip>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}

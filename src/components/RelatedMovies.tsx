import { Rating, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPopularMovies } from "../features/films";
import { movie } from "../interfaces/movie";

interface Props {
  type: string | undefined;
}

export default function RelatedMovies({ type }: Props) {

    const [suggest, setSuggest] = useState<movie[]>([]);
    useEffect(() =>{
        const getSuggest = async() => {
            try{
                if(typeof type === 'string'){
                    const {results} = await getPopularMovies(type);
                    setSuggest(results.slice(0, Math.min(results.length, 8)));
                }
            }catch(err){
                console.log(err);
            }
        }
        getSuggest();
    },[type])

  return (
    <div className="suggested">
      <h1 className="text-3xl text-center uppercase text-semibold">
        You might also like
      </h1>
      <div className="movies p-10 md:px-24 sm:px-20 px-10 grid grid-cols-10 gap-10">
      {suggest.map((movie) => (
        <div key={movie.id} className="flex flex-col justify-between items-center">
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
            <Tooltip disableTouchListener title={`${movie.vote_average} / 10`}>
              <Rating readOnly value={movie.vote_average / 2} precision={0.1} />
            </Tooltip>
          </div>
        </div>
      ))}
    </div>

    </div>
  );
}

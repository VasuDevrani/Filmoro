import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getCastData, getMovieDetails } from "../features/films";
import { aboutMovie, person } from "../interfaces/movie";
import Loading from "./Loading";
import { Modal } from "@mui/material";
import { styled } from "@mui/styles";
import { BsGlobe, BsHeartFill, BsArrowLeft } from "react-icons/bs";
import { MdMovie, MdLocalMovies } from "react-icons/md";
import RelatedMovies from "./RelatedMovies";
import axios from "axios";
import { Store } from "../Store";

export default function MovieDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const { dispatch } = useContext(Store);

  const [error, setError] = useState(false);
  const [movieData, setMovieData] = useState<aboutMovie | null>(null);
  const [load, setLoading] = useState(true);
  const [cast, setCast] = useState<person[]>([]);
  const [open, setOpen] = useState(false);

  const id: string | undefined = params.id;

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      setLoading(true);
      try {
        if (typeof id === "string") {
          setError(false);
          let data = await getMovieDetails(id);
          setMovieData(data);

          data = await getCastData(id);
          setCast(
            data.credits.cast.slice(0, Math.min(data.credits.cast.length, 6))
          );

          setLoading(false);
        } else {
          setLoading(false);
          setError(true);
        }
      } catch (err) {
        setLoading(false);
        setError(true);
        console.log(err);
      }
    };
    getData();
  }, [id]);

  const handleClick = async (genre: number) => {
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

  const StyledModal = styled(Modal)(() => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const Video = styled("iframe")(() => ({
    width: "80%",
    height: "70%",
  }));

  return (
    <>
      {load ? (
        <Loading />
      ) : (
        <div key={id} className="details flex flex-col py-10 px-4">
          <div className="top flex flex-col gap-10 mid:flex-row justify-between items-center mid:items-start">
            <img
              src={
                movieData?.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movieData.poster_path}`
                  : "https://dummyimage.com/200x300/fff/aaa"
              }
              alt="movie image"
              className="w-[70%] mid:w-[40%] md:rounded-[50px] rounded-[30px] drop-shadow-4xl contrast-125"
            />
            {/* info */}
            <div className="dark:text-white info text-center font-roboto px-4">
              <h1 className="xl:text-5xl text-4xl font-semibold my-4 leading-tight">
                {movieData?.title} ({movieData?.release_date.slice(0, 4)})
              </h1>
              <p className="xl:text-3xl text-xl my-3">{movieData?.tagline}</p>
              <p className="text-2xl my-2">
                {movieData?.runtime} min / {movieData?.original_language}
              </p>
              <div className="genre flex flex-row flex-wrap items-center justify-center mt-8 gap-3 text-xl cursor-pointer">
                {movieData?.genres.map((genre) => (
                  <h6 key={genre.id} onClick={() => handleClick(genre.id)}>
                    {genre.name}
                  </h6>
                ))}
              </div>
              <div className="overview flex flex-col items-start text-left">
                <h3 className="text-3xl mt-7 mb-3 font-semibold">OverView</h3>
                <p className="text-lg">{movieData?.overview}</p>
              </div>
              <div className="cast text-left">
                <h3 className="text-3xl font-semibold my-3 mt-10">Top Cast</h3>
                <div className="flex flex-row flex-wrap gap-5">
                  {cast.map((person) => (
                    <Link to={`/cast/${person.id}`}>
                      <div className="w-32 rounded-3xl text-center">
                        <img
                          src={
                            person?.profile_path
                              ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
                              : "https://dummyimage.com/200x300/fff/aaa"
                          }
                          alt=""
                          className="w-[100%] object-cover h-32 rounded-3xl cursor-pointer"
                        />
                        <h1 className="text-base mt-3 text-center cursor-pointer">
                          {person.original_name}
                        </h1>
                        <p className="text-gray-500">
                          {person.character.split("/")[0]}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="btn-grp1 flex my-10 mx-3 flex-row flex-wrap">
                <div className="util-btn">
                  WEBSITE <BsGlobe />
                </div>
                <div className="util-btn">
                  IMDB <MdMovie />
                </div>
                <div className="util-btn" onClick={() => setOpen(!open)}>
                  TRAILER <MdLocalMovies />
                </div>
              </div>
              <div className="btn-grp2 flex my-10 mx-3 flex-row flex-wrap">
                <div className="util-btn">
                  FAVOURITE <BsHeartFill />
                </div>
                <div className="util-btn">WATCHLIST</div>
                <div className="util-btn" onClick={() => navigate(-1)}>
                  BACK <BsArrowLeft />
                </div>
              </div>
            </div>
          </div>

          {movieData?.videos?.results[0]?.key && (
            <StyledModal
              closeAfterTransition
              open={open}
              onClose={() => setOpen(false)}
            >
              <Video
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${movieData.videos.results[0].key}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </StyledModal>
          )}
          {/* suggested */}
          <RelatedMovies
            type={
              movieData?.genres[
                Math.floor(Math.random() * movieData?.genres.length)
              ]?.name
            }
          />
        </div>
      )}
    </>
  );
}

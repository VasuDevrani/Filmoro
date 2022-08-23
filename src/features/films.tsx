import axios from "axios";
import { ContextActions } from "../Store";

const getPopularMovies = async (query: string) => {
  const { data } = await axios.get(
    query.length > 0
      ? `https://api.themoviedb.org/3/search/movie?api_key=9927d57067753126d627ab0540ed625a&query=${query}`
      : `https://api.themoviedb.org/3/movie/popular?api_key=9927d57067753126d627ab0540ed625a&language=en-US`
  );
  return data;
};

const getMovieDetails = async (id: string) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=9927d57067753126d627ab0540ed625a&append_to_response=videos`
  );
  return data;
};

const getCastData = async (id: string) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=9927d57067753126d627ab0540ed625a&append_to_response=credits`
  );
  return data;
};

const getPerson = async (id: string) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/person/${id}?api_key=9927d57067753126d627ab0540ed625a&language=en-US&append_to_response=movies`
  );
  return data;
};

const getPersonMovies = async(id: string) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/discover/movie?with_cast=${id}&api_key=9927d57067753126d627ab0540ed625a`
  );
  return data.results;
}

const getMovies = async (
  dispatch: React.Dispatch<ContextActions>,
  query: string = ""
) => {
  try {
    dispatch({ type: "START_ADD" });
    setTimeout(async () => {
      const { results } = await getPopularMovies(query);

      dispatch({ type: "ADD_MOVIES", payload: results });
    }, 500);
  } catch (err) {
    dispatch({ type: "FAIL_ADD" });
    console.log(err);
  }
};

export { getPopularMovies, getMovies, getMovieDetails, getCastData, getPerson, getPersonMovies };

// https://api.themoviedb.org/3/discover/movie?with_cast=2511949&api_key=9927d57067753126d627ab0540ed625a&language=en-US&sort_by=popularity.desc  cast movies
// https://api.themoviedb.org/3/person/56322?api_key=9927d57067753126d627ab0540ed625a&language=en-US  cast details
// https://api.themoviedb.org/3/movie/150540?api_key=9927d57067753126d627ab0540ed625a&append_to_response=credits   cast and credits
// https://api.themoviedb.org/3/movie/150540?api_key=9927d57067753126d627ab0540ed625a   movie details

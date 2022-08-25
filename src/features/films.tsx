import axios from "axios";
import { ContextActions } from "../Store";

let base = 'https://api.themoviedb.org/3';

const getPopularMovies = async (query: string = "", page: number = 1, id: string = "", category: string = "" ) => {
  let URL: string;
  if(query.length > 0)
  {
    URL = `${base}/search/movie?api_key=${API}&query=${query}&page=${page}`;
  }else if (id.length > 0){
    URL = `${base}/discover/movie?api_key=${API}&with_genres=${id}&page=${page}`
  }else if(category.length > 0){
    URL = `${base}/movie/${category}?api_key=${API}&language=en-US&page=${page}`
  }
  else{
    URL = `${base}/movie/popular?api_key=${API}&language=en-US&page=${page}`;
  }
  const { data } = await axios.get(URL);
  return data;
};

const getMovieDetails = async (id: string) => {
  const { data } = await axios.get(
    `${base}/movie/${id}?api_key=${API}&append_to_response=videos`
  );
  return data;
};

const getCastData = async (id: string) => {
  const { data } = await axios.get(
    `${base}/movie/${id}?api_key=${API}&append_to_response=credits`
  );
  return data;
};

const getPerson = async (id: string) => {
  const { data } = await axios.get(
    `${base}/person/${id}?api_key=${API}&language=en-US&append_to_response=movies`
  );
  return data;
};

const getPersonMovies = async(id: string) => {
  const { data } = await axios.get(
    `${base}/discover/movie?with_cast=${id}&api_key=${API}`
  );
  return data.results;
}

const getMovies = async (
  dispatch: React.Dispatch<ContextActions>,
  query: string = "",
  page: number = 1,
  id: string = "",
  category: string = ""
) => {
  try {
    dispatch({ type: "START_ADD" });
    setTimeout(async () => {
      const { results } = await getPopularMovies(query, page, id, category);
      dispatch({ type: "ADD_MOVIES", payload: results });
    }, 200);
  } catch (err) {
    dispatch({ type: "FAIL_ADD" });
    console.log(err);
  }
};

export { getPopularMovies, getMovies, getMovieDetails, getCastData, getPerson, getPersonMovies };

// ${base}/discover/movie?with_cast=2511949&api_key=${API}&language=en-US&sort_by=popularity.desc  cast movies
// ${base}/person/56322?api_key=${API}&language=en-US  cast details
// ${base}/movie/150540?api_key=${API}&append_to_response=credits   cast and credits
// ${base}/movie/150540?api_key=${API}   movie details

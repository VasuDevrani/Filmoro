import axios from "axios";
import { ContextActions } from "../Store";

const getPopularMovies = async() => {
    const {data} = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=9927d57067753126d627ab0540ed625a&language=en-US')
    return data;
}
const getMovies = async (dispatch: React.Dispatch<ContextActions>) => {
    try {
      dispatch({ type: "START_ADD" });
      setTimeout(async () => {
        const { results } = await getPopularMovies();

        dispatch({ type: "ADD_MOVIES", payload: results });
      }, 1000);
    } catch (err) {
      dispatch({ type: "FAIL_ADD" });
      console.log(err);
    }
  };

export {getPopularMovies, getMovies};
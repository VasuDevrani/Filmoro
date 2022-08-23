export type movie = {
    title: string,
    id: string,
    poster_path: string,
    backdrop_path: string,
    vote_average: number 
  }

export type video = {
  key: string;
}
export type results = {
  results: video[];
}

export type aboutMovie = {
  title: string;
  release_date: string;
  runtime: number;
  overview: string;
  tagline: string;
  homepage: string;
  poster_path: string;
  genres: genres[];
  original_language: string;
  videos: results;
}

export type person = {
  id: string;
  character: string;
  original_name: string;
  profile_path: string;
}

export type personData = {
  name: string;
  biography: string;
  birthday: string;
  profile_path: string;
} 

export type genres = {
  id: number,
  name: string
}
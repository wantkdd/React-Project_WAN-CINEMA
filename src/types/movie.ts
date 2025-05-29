export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type MovieResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

// Movie에서 추가된 속성
export type MovieDetail = Movie & {
  runtime: number;
  tagline: string;
  genres: { id: number; name: string }[];
};

// 감독 / 출연 타입
export type CastMember = {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
};

export type CrewMember = {
  id: number;
  name: string;
  job: string;
  profile_path: string | null;
};

export type MovieCredits = {
  cast: CastMember[];
  crew: CrewMember[];
};

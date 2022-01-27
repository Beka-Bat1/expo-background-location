import axios from "axios";
import { API_URI, API_KEY, POSTER_URI } from "@env";

const instance = axios.create({
  baseURL: API_URI,
  headers: { "Content-Type": "application/json" },
  params: {
    api_key: API_KEY,
  },
});

//api.themoviedb.org/3/movie/now_playing?api_key={process.env.API_KEY}&language={ language ||'en-US'}&page=1&region={ region || 'UA'}

export const requestMovies = ({
  language,
  region,
}: {
  language?: string;
  region?: string;
} = {}) => {
  return instance
    .get("/movie/now_playing", {
      params: {
        language: language || "en-US",
        page: 1,
        region: region || "UA",
      },
    })
    .then((res) => {
      if (res.status !== 200) return;

      const results = res.data.results.map((r: any) => {
        return {
          poster: `${POSTER_URI}${r.poster_path}`,
          title: r.title,
          rating: r.vote_average,
          id: r.id,
        };
      });

      return results;
    })
    .catch((err) => {
      return err;
    });
};

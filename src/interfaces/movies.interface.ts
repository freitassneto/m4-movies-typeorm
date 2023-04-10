import {
  createMovieSchema,
  returnMovieSchema,
  allMoviesSchema,
} from "../schemas/movie.schema";
import { z } from "zod";
import { DeepPartial, Repository } from "typeorm";
import { Movie } from "../entities";

type iMovieCreate = z.infer<typeof createMovieSchema>;
type tMovie = z.infer<typeof returnMovieSchema>;

type tAllMoviesReturn = z.infer<typeof allMoviesSchema>;

type iMovieUpdate = DeepPartial<iMovieCreate>;

type iMovieRepo = Repository<Movie>;

interface iPagination {
  prevPage: string | null;
  nextPage: string | null;
  count: number;
  data: tMovie[];
}

export {
  iMovieCreate,
  tMovie,
  tAllMoviesReturn,
  iMovieUpdate,
  iMovieRepo,
  iPagination,
};

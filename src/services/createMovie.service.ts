import { iMovieCreate, tMovie } from "../interfaces/movies.interface";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { Repository } from "typeorm";
import { returnMovieSchema } from "../schemas/movie.schema";

const createMovieService = async (movieData: iMovieCreate): Promise<tMovie> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const movie: Movie = movieRepository.create(movieData);

  await movieRepository.save(movie);

  const newMovie = returnMovieSchema.parse(movie);

  return newMovie;
};

export default createMovieService;

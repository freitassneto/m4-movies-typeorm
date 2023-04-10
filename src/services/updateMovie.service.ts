import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { tMovie, iMovieUpdate } from "../interfaces/movies.interface";
import { returnMovieSchema } from "../schemas/movie.schema";

const updateMovieService = async (userData: iMovieUpdate, movieId: number): Promise<tMovie> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const oldMovieData = await movieRepository.findOneBy({
    id: movieId,
  });

  const movie = movieRepository.create({
    ...oldMovieData,
    ...userData,
  });

  await movieRepository.save(movie);

  const updatedMovie = returnMovieSchema.parse(movie);

  return updatedMovie;
};

export default updateMovieService;

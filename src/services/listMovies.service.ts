import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { iPagination, tAllMoviesReturn } from "../interfaces/movies.interface";
import { allMoviesSchema } from "../schemas/movie.schema";

const listMoviesService = async (
  perPage: any,
  page: any,
  sort: any,
  order: any
): Promise<iPagination> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  let takeParam: number = Number(perPage) || 5;
  let skipParam: number = Number(page) || 1;
  let count: number = await movieRepository.count();
  let orderParam: string = "asc";
  let sortParam: string = "id";

  if (takeParam <= 0 || takeParam > 5) takeParam = 5;
  if (skipParam <= 0) skipParam = 1;

  if (sort === "price") {
    sortParam = "price";
    orderParam = order || "asc";
  } else if (sort === "duration") {
    sortParam = "duration";
    orderParam = order || "asc";
  }

  const baseUrl: string = `http://localhost:3000/movies`;
  let prevPage: string | null = `${baseUrl}?page=${
    skipParam - 1
  }&perPage=${takeParam}`;
  let nextPage: string | null = `${baseUrl}?page=${
    skipParam + 1
  }&perPage=${takeParam}`;

  const findMovies = await movieRepository.find({
    take: takeParam,
    skip: takeParam * (skipParam - 1),
    order: {
      [sortParam]: orderParam,
    },
  });

  if (skipParam === 1) {
    prevPage = null;
  } else if (findMovies.length < takeParam || count === skipParam * takeParam) {
    nextPage = null;
  }

  const movies: tAllMoviesReturn = allMoviesSchema.parse(findMovies);

  const pagination: iPagination = {
    prevPage: prevPage,
    nextPage: nextPage,
    count: count,
    data: movies,
  };

  return pagination;
};

export default listMoviesService;

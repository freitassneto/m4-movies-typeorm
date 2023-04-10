import { Request, Response } from "express";
import { iMovieCreate, iPagination } from "../interfaces/movies.interface";
import createMovieService from "../services/createMovie.service";
import deleteMovieService from "../services/deleteMovie.service";
import listMoviesService from "../services/listMovies.service";
import updateMovieService from "../services/updateMovie.service";

const createMovieController = async (req: Request, res: Response) => {
  const movieData: iMovieCreate = req.body;

  const newMovie = await createMovieService(movieData);

  return res.status(201).json(newMovie);
};

const listMoviesController = async (req: Request, res: Response) => {
  const { perPage, page, sort, order } = req.query;
  const movies: iPagination = await listMoviesService(
    perPage,
    page,
    sort,
    order
  );

  return res.json(movies);
};

const updateMovieController = async (req: Request, res: Response) => {
  const movieData = req.body;
  const movieId = Number(req.params.id);
  console.log(movieData)

  const updatedMovie = await updateMovieService(movieData, movieId);

  return res.status(200).json(updatedMovie);
};

const deleteMovieController = async (req: Request, res: Response) => {
  await deleteMovieService(Number(req.params.id));

  return res.status(204).json();
};

export {
  createMovieController,
  listMoviesController,
  deleteMovieController,
  updateMovieController,
};

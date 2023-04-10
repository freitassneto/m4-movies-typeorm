import { Router } from "express";
import {
  createMovieController,
  deleteMovieController,
  listMoviesController,
  updateMovieController,
} from "../controllers/movies.controllers";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import ensureMovieExistsMiddleware from "../middlewares/ensureMovieExists.middleware";
import ensureNameWontRepeatMiddleware from "../middlewares/ensureNameWontRepeat.middleware";
import { createMovieSchema, movieUpdateSchema } from "../schemas/movie.schema";

const movieRoutes: Router = Router();

movieRoutes.post("", ensureDataIsValidMiddleware(createMovieSchema), ensureNameWontRepeatMiddleware, createMovieController);
movieRoutes.get("", listMoviesController);
movieRoutes.patch("/:id", ensureMovieExistsMiddleware, ensureDataIsValidMiddleware(movieUpdateSchema), ensureNameWontRepeatMiddleware, updateMovieController);
movieRoutes.delete("/:id", ensureMovieExistsMiddleware, deleteMovieController);

export default movieRoutes;

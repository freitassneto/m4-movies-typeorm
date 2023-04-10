import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { AppError } from "../errors";

const ensureNameWontRepeatMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);
  
  if (req.body.name === undefined){
    return next();
  }
  const findMovieName = await movieRepository.findOneBy({
    name: req.body.name,
  });

  if (findMovieName) {
    throw new AppError("Movie already exists.", 409);
  }
  if (req.body.price < 0) {
    throw new AppError("Price must be greater than or equal to 0", 400);
  }
  

  next();
};

export default ensureNameWontRepeatMiddleware;

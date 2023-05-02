import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { TMovie, TMovieResponse } from "../interfaces/movies.interfaces";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { AppError } from "../error";

const verifyNameExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const movieRepository: Repository<TMovie> =
    AppDataSource.getRepository(Movie);
  const movies: TMovieResponse | null = await movieRepository.findOneBy({
    name: req.body.name,
  });

  if (movies) {
    throw new AppError("Movie already exists.", 409);
  }

  return next();
};

export { verifyNameExistsMiddleware };

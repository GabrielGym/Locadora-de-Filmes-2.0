import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";
import { TMovie, TMovieResponse } from "../interfaces/movies.interfaces";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";

const verifyIdExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id: number = parseInt(req.params.id);
  const movieRepository: Repository<TMovie> =
    AppDataSource.getRepository(Movie);
  const movies: TMovieResponse | null = await movieRepository.findOneBy({
    id: id,
  });

  if (!movies) {
    throw new AppError("Movie not found", 404);
  }

  return next();
};

export { verifyIdExistsMiddleware };

import { Request, Response } from "express";
import {
  TMovieRequest,
  TMovieResponse,
  TMovieUpdateRequest,
} from "../interfaces/movies.interfaces";
import { createMoviesService } from "../services/createMovies.service";
import { getMoviesService } from "../services/getMovies.service";
import { updateMoviesService } from "../services/updateMovies.service";
import { deleteMoviesService } from "../services/deleteMovies.service";

const createMoviesControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const movieData: TMovieRequest = req.body;
  const newMovie: TMovieResponse = await createMoviesService(movieData);

  return res.status(201).json(newMovie);
};

const getMoviesControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const movies: TMovieResponse[] = await getMoviesService();

  return res.status(200).json(movies);
};

const updateMoviesControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const movieData: TMovieUpdateRequest = req.body;
  const userId: number = parseInt(req.params.id);
  const newMoviesData: TMovieResponse = await updateMoviesService(
    movieData,
    userId
  );

  return res.status(200).json(newMoviesData);
};

const deleteMoviesControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = parseInt(req.params.id);
  const newMoviesData = await deleteMoviesService(userId);

  return res.status(204).json(newMoviesData);
};

export {
  createMoviesControllers,
  getMoviesControllers,
  updateMoviesControllers,
  deleteMoviesControllers,
};

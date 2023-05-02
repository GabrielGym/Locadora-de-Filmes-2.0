import { Repository } from "typeorm";
import {
  TMovie,
  TMovieRequest,
  TMovieResponse,
} from "../interfaces/movies.interfaces";
import { Movie } from "../entities";
import { AppDataSource } from "../data-source";

const createMoviesService = async (
  movieData: TMovieRequest
): Promise<TMovieResponse> => {
  const movieRepository: Repository<TMovie> =
    AppDataSource.getRepository(Movie);

  const movie: TMovie = movieRepository.create(movieData);
  await movieRepository.save(movie);

  return movie;
};

export { createMoviesService };

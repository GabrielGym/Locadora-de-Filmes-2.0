import { Repository } from "typeorm";
import {
  TMovie,
  TMovieResponse,
} from "../interfaces/movies.interfaces";
import { Movie } from "../entities";
import { AppDataSource } from "../data-source";

const getMoviesService = async (): Promise<TMovieResponse[]> => {
  const movieRepository: Repository<TMovie> =
    AppDataSource.getRepository(Movie);
  const movies: TMovieResponse[] = await movieRepository.find();

  return movies;
};

export { getMoviesService };

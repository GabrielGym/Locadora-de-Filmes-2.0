import { Repository } from "typeorm";
import {
  TMovieResponse,
  TMovieUpdateRequest,
} from "../interfaces/movies.interfaces";
import { Movie } from "../entities";
import { AppDataSource } from "../data-source";

const updateMoviesService = async (
  movieData: TMovieUpdateRequest,
  userId: number
): Promise<TMovieResponse> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const oldMovieData: Movie | null = await movieRepository.findOneBy({
    id: userId,
  });

  const newMovieData: Movie = movieRepository.create({
    ...oldMovieData,
    ...movieData,
  });

  await movieRepository.save(newMovieData);

  return newMovieData;
};

export { updateMoviesService };

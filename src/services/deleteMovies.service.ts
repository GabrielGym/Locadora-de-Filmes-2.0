import { DeleteResult, Repository } from "typeorm";
import { Movie } from "../entities";
import { AppDataSource } from "../data-source";

const deleteMoviesService = async (userId: number): Promise<DeleteResult> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const movie: DeleteResult = await movieRepository.delete({
    id: userId,
  });

  return movie;
};

export { deleteMoviesService };

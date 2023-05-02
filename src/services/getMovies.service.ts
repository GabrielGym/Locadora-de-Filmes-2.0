import { Repository } from "typeorm";
import {
  TMovie,
  TMovieResponse,
  TMoviesPagination,
} from "../interfaces/movies.interfaces";
import { Movie } from "../entities";
import { AppDataSource } from "../data-source";

const getMoviesService = async (
  sort: string,
  order: string,
  page: number,
  perPage: number
): Promise<TMoviesPagination> => {
  const movieRepository: Repository<TMovie> =
    AppDataSource.getRepository(Movie);
  let movies: TMovieResponse[] | undefined = await movieRepository.find();
  const count = movies.length;
  let orderObj = {};

  if (!page && !perPage) {
    movies = await movieRepository.find();
  } else if (page > 0 && !perPage) {
    movies = await movieRepository.find({
      skip: page,
    });
  } else if (!page && perPage < 5 && perPage > 0) {
    movies = await movieRepository.find({
      take: perPage,
    });
  } else {
    movies = await movieRepository.find({
      skip: (page - 1) * perPage,
      take: perPage,
    });
  }

  if (sort === "price") {
    orderObj = {
      price: order,
    };
    movies = await movieRepository.find({
      order: orderObj,
    });
  }
  if (sort === "duration") {
    orderObj = {
      duration: order,
    };
    movies = await movieRepository.find({
      order: orderObj,
    });
  }

  if (!page) {
    return {
      prevPage: null,
      nextPage: null,
      count: count,
      data: movies,
    };
  } else if (page < 1) {
    return {
      prevPage: null,
      nextPage: `http://localhost:3000/movies/?page=${page + 1}`,
      count: count,
      data: movies,
    };
  } else if (page >= count) {
    return {
      prevPage: `http://localhost:3000/movies/?page=${page - 1}`,
      nextPage: null,
      count: count,
      data: movies,
    };
  }
  return {
    prevPage: `http://localhost:3000/movies/?page=${page - 1}`,
    nextPage: `http://localhost:3000/movies/?page=${page + 1}`,
    count: count,
    data: movies,
  };
};

export { getMoviesService };

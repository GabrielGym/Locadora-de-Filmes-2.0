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

  let take: number = Number(perPage) || 5;
  if (take > 5) {
    take = 5;
  } 
  if (take < 1) {
    take = 5;
  }
  const skip: number = Number(page) || 1;

  if (!page && !perPage) {
    movies = await movieRepository.find();
  } else if (page > 0 && !perPage) {
    movies = await movieRepository.find({
      skip: skip,
    });
  } else if (!page && perPage) {
    movies = await movieRepository.find({
      take: take,
    });
  } else {
    movies = await movieRepository.find({
      skip: (skip - 1) * take,
      take: take,
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

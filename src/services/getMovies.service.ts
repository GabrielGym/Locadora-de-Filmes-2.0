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
  
  let take: number = parseInt(perPage.toFixed(0)) || 5;  
  if (take > 5 || take <= 0 || take === null) {
    take = 5;
  }

  let skip: number = parseInt(page.toFixed(0));
  if (skip <= 0 || !page) {
    skip = 1;
  }
  skip = (skip - 1) * take;

  let orderObj = {};
  if (sort === "price") {
    orderObj = {
      price: order,
    };
  } else if (sort === "duration") {
    orderObj = {
      duration: order,
    };
  } else {
    orderObj = {
      id: "asc",
    };
  }
  if(page == 0){
    page = 1
  }
  let prevPage: string | null = `http://localhost:3000/movies?page=${page - 1}&perPage=${take}` || null;
  let nextPage: string | null = `http://localhost:3000/movies?page=${page + 1}&perPage=${take}` || null;

  const [data, count] = await movieRepository.findAndCount({
    order: orderObj,
    skip: skip,
    take: take,
  });

  if (!page) {
    (prevPage = null), (nextPage = `http://localhost:3000/movies?page=2&perPage=${take}`);
  } else if (page <= 1) {
    prevPage = null;
  } else if (page >= (count / perPage)) {
    nextPage = null;
  }

  return {
    prevPage,
    nextPage,
    count,
    data,
  };
};

/*   await movieRepository.find({
    take: take,
    skip: skip,
    order: orderObj,
  }); */
/*   return {
    prevPage: prevPage,
    nextPage: nextPage,
    count: count,
    data: movies,
  }; */
// };

export { getMoviesService };

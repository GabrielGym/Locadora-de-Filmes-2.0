import { z } from "zod";
import { movieSchema, movieSchemaRequest } from "../schemas/movies.schemas";
import { DeepPartial } from "typeorm";

type TMovie = z.infer<typeof movieSchema>;

type TMovieRequest = z.infer<typeof movieSchemaRequest>;

type TMovieResponse = z.infer<typeof movieSchema>;

type TMovieUpdateRequest = DeepPartial<TMovieRequest>;

type TMoviesPagination = {
  prevPage: string | null
  nextPage: string | null
  count: number
  data: TMovieResponse[];
};

export { TMovie, TMovieRequest, TMovieResponse, TMovieUpdateRequest, TMoviesPagination };

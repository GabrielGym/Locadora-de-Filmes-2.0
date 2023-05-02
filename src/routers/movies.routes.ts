import { Router } from "express";
import {
  createMoviesControllers,
  getMoviesControllers,
  updateMoviesControllers,
  deleteMoviesControllers,
} from "../controllers/movies.controllers";
import { verifyNameExistsMiddleware } from "../middlewares/verifyNameExists.middleware";
import { verifyDataIsValidadMiddleware } from "../middlewares/verifyDataIsValidad.middleware";
import {
  movieSchemaRequest,
  movieUpdateSchema,
} from "../schemas/movies.schemas";
import { verifyIdExistsMiddleware } from "../middlewares/verifyIdExists.middleware";

const userRoutes: Router = Router();

userRoutes.post(
  "",
  verifyDataIsValidadMiddleware(movieSchemaRequest),
  verifyNameExistsMiddleware,
  createMoviesControllers
);
userRoutes.get("", getMoviesControllers);
userRoutes.patch(
  "/:id",
  verifyDataIsValidadMiddleware(movieUpdateSchema),
  verifyIdExistsMiddleware,
  verifyNameExistsMiddleware,
  updateMoviesControllers
);
userRoutes.delete("/:id", verifyIdExistsMiddleware, deleteMoviesControllers);

export { userRoutes };

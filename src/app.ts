import "reflect-metadata";
import "express-async-errors";
import express, { Application } from "express";
import { handleErros } from "./error";
import { userRoutes } from "./routers/movies.routes";

const app: Application = express();
app.use(express.json());

app.use("/movies", userRoutes);

app.use(handleErros);

export default app;

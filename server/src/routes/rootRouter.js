import express from "express";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import chordsRouter from "./api/v1/chordsRouter.js"
import wordsRouter from "./api/v1/wordsRouter.js"
const rootRouter = new express.Router();
rootRouter.use("/", clientRouter);

rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter);
rootRouter.use("/api/v1/chords", chordsRouter)
rootRouter.use("/api/v1/words", wordsRouter) //place your server-side routes here

export default rootRouter;

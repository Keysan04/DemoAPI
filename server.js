import express from "express";
import "dotenv/config";
import { connectDB } from "./src/config/dbConfig.js";
import userRouter from "./src/router/userRouter.js";
import taskRouter from "./src/router/taskRouter.js";

const app = express();
const PORT = process.env.PORT || 8000;

import cors from "cors";
app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/v1/user", userRouter);
app.use("/api/v1/task", taskRouter);
app.use("*", (req, res, next) => {
  const error = {
    message: "404 page not found",
    errorCode: 404,
  };
});
app.get("/", (req, res) => {
  res.json({
    status: "not found",
    message: "hello ",
  });
});

app.use((error, req, res, next) => {
  const errorCode = error.errorCode || 500;
  res.status(errorCode).json({
    status: "error",
    message: error.message,
  });
});

app.listen(PORT, (error) => {
  error
    ? console.log(error.message)
    : console.log(`server is running at http://localhost:${PORT}`);
});

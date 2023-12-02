import express, { request } from "express";
import {
  deleteManyTask,
  deleteTask,
  getAllTasks,
  insertTask,
  switchTask,
} from "../models/TaskModel.js";
import { userAuth } from "../middleware/authMiddleware.js";
const router = express.Router();
router.get("/", userAuth, async (req, res) => {
  const taskList = await getAllTasks(req.userId);

  res.json({
    status: "success",
    message: "Here are the task list",
    taskList,
  });
});
router.post("/", userAuth, async (req, res) => {
  try {
    //console.log(req.body);

    console.log(userAuth);
    // req.userId = "656920c822424115c5696b57";
    // call model for query
    const result = await insertTask({ ...req.body, userId: req.userId });

    result?._id
      ? res.json({
          status: "success",
          message: "Transaction has been added successfully",
        })
      : res.json({
          status: "error",
          message: "Unable to add the transaction, please try again later",
        });
  } catch (error) {
    res.json({
      stauts: "error",
      message: error.message,
    });
  }
});

router.patch("/", async (req, res) => {
  const { _id, task, hr } = req.body;

  const result = await switchTask(_id, { task, hr });
  console.log("patched", result);
  result?._id
    ? res.json({
        status: "success",
        message: "The task has been updated!",
      })
    : res.json({
        status: "error",
        message: "Error, unable to update the task, try again later",
      });
});

// app.delete("/api/v2/task/:_id", async (req, res) => {
router.delete("/", userAuth, async (req, res, next) => {
  try {
    const { userId, body } = req;
    const result = await deleteManyTask(userId, body);

    result.deletedCount
      ? res.json({
          status: "success",
          message: `${result.deletedCount} transactions has been deleted`,
        })
      : res.json({
          status: "error",
          message: `Unable to delete the trnassactions, please try agian later`,
        });
  } catch (error) {
    next(error);
  }
});

export default router;

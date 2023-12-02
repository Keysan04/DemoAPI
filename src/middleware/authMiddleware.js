import { getUserById } from "../models/userModel.js";

export const userAuth = async (req, res, next) => {
  try {
    // check if user exist with _id or not
    const { authorization } = req.headers;
    console.log(authorization);
    const user = await getUserById(authorization);
    console.log(user);
    if (user?._id) {
      req.userId = authorization;
      next();
      return;
    }
    res.status(403).json({
      status: `error+ ${user}`,
      message: "Unauthorized",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

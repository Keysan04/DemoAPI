import userSchema from "./userSchema.js";

export const insertUser = (userObj) => {
  return userSchema(userObj).save();
};

export const getUserByEmail = (email) => {
  return userSchema.findOne({ email });
};
export const getUserById = (_id) => {
  return userSchema.findById(_id);
};

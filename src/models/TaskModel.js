import TaskSchema from "./TaskSchema.js";

//CRUD
//Create
export const insertTask = (taskObj) => {
  return TaskSchema(taskObj).save();
};

//Read
export const getAllTasks = (userId) => {
  return TaskSchema.find({ userId });
};

//Update
//@_id is ID staring, @data is an object
export const switchTask = (_id, data) => {
  return TaskSchema.findByIdAndUpdate(_id, data, { new: true });
};

//Delete
export const deleteTask = (_id) => {
  return TaskSchema.findByIdAndDelete(_id);
};
// Delete many
export const deleteManyTask = (userId, idsArg) => {
  return TaskSchema.deleteMany({
    userId,
    _id: {
      $in: idsArg,
    },
  });
};

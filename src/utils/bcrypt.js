import bcrypt from "bcrypt";

const salt = 15;

export const hashPassword = (plainPass) => {
  return bcrypt.hashSync(plainPass, salt);
};

export const comparePassword = (plainPass, hashPass) => {
  return bcrypt.compareSync(plainPass, hashPass);
};

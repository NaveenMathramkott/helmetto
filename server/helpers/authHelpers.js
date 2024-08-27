import bcrypt from "bcrypt";

// password hashing function
export const hashPassword = async (password) => {
  try {
    const slatRounds = 10;
    const hashedPassword = await bcrypt.hash(password, slatRounds);
    return hashedPassword;
  } catch (error) {
    console.log(`error hashing password`);
  }
};

// password comparing function

export const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

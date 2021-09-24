/* eslint-disable no-shadow */
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const dbService = require('../utils/dbService');
const { JWT_SECRET } = require('../constants/appConstant');

async function generateToken(user, secret) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    secret,
    { expiresIn: '1d' },
  );
}

module.exports = {
  loginUser: async (email, password) => {
    try {
      const user = await dbService.getDocumentByQuery(User, { 'email': email });
      if (!user) {
        return {
          flag: true,
          data: 'User not exists',
        };
      }
      console.log("________________isPAsswordMAtched", user);
      console.log("_______________password", password);
      const isPasswordMatched = await user.isPasswordMatch(password);
      console.log("__________isPAsswordMAtched", isPasswordMatched)
      if (isPasswordMatched) {
        const { password, ...userData } = user.toJSON();
        const token = await generateToken(userData, JWT_SECRET);
        const userToReturn = {
          ...userData,
          ...{ token },
        };
        return {
          flag: false,
          data: userToReturn,
        };
      }
      return {
        flag: true,
        data: 'Incorrect Password',
      };
    } catch (error) {
      console.log("______________error", error);
      throw new Error(error.message);
    }
  },
};

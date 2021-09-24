const fs = require('fs');
const { rootPath } = require('../constants/appConstant');
const User = require('../models/userModel');
const authService = require('../services/auth');
const {
  getDocumentByQuery,
  createDocument,
  findOneAndUpdateDocument,
} = require('../utils/dbService');

module.exports = {
  /*
   * api: user register
   * description : first time user registration.
   */
  registration: async (req, res) => {
    try {
      const data = new User({ ...req.body });

      const isRecordExist = await getDocumentByQuery(User, { email: data.email });
      if (isRecordExist) {
        return res.inValidParam('User Registration Failed, Duplicate Data found');
      }

      const result = await createDocument(User, data);
      return res.ok(result);
    } catch (error) {
      console.log("__________error", error)
      if (error.name === 'ValidationError') {
        return res.validationError(error.message);
      }
      if (error.code && error.code === 11000) {
        return res.isDuplicate(error.message);
      }
      return res.failureResponse(error.message);
    }
  },
  /*
   * api :  authentication
   * description : login user
   */
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (email && password) {
        const result = await authService.loginUser(email, password);
        if (!result.flag) {
          return res.loginSuccess(result.data);
        }
        return res.loginFailed(result.data);
      }
      return res.insufficientParameters();
    } catch (error) {
      return res.failureResponse(error.message);
    }
  },
  getUser: async (req, res) => {
    try {
      const query = { _id: req.params.id };

      const result = await getDocumentByQuery(User, query);
      if (result) {
        const user = result.toJSON();
        delete user.password;
        return res.ok(user);
      }
      return res.recordNotFound({});
    } catch (error) {
      return res.failureResponse(error.message);
    }
  },
  updateProfile: async (req, res) => {
    try {
      const data = {
        ...req.body,
        id: req.user.id,
      };
      if (data.password) delete data.password;
      if (data.createdAt) delete data.createdAt;
      if (data.updatedAt) delete data.updatedAt;
      if (data.id) delete data.id;
      if (req.file) {
        data.profile = req.file.filename;
        const result = await getDocumentByQuery(User, { _id: req.user.id });
        const filePath = `${rootPath}/images/users/${result.profile}`;
        if (fs.existsSync(filePath)) {
          await fs.unlinkSync(filePath);
        }
      }
      const result = await findOneAndUpdateDocument(User, { _id: req.user.id }, data, {
        new: true,
      });
      if (!result) {
        return res.failureResponse('something is wrong');
      }
      const user = result.toJSON();
      delete user.password;
      return res.ok(user);
    } catch (error) {
      console.log("__________erorr", error)
      if (error.name === 'ValidationError') {
        return res.isDuplicate(error.message);
      }
      if (error.code && error.code === 11000) {
        return res.isDuplicate(error.message);
      }
      return res.failureResponse(error.message);
    }
  },
};

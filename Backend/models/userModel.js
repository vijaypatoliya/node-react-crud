/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;
const { API_URL } = require('../constants/appConstant').config;

const schema = new Schema(
  {
    firstname: { type: String },
    lastname: { type: String },
    password: { type: String },
    email: { type: String },
    mobileno: { type: String },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    isActive: { type: Boolean },
    createdAt: { type: Date },
    updatedAt: { type: Date },
    token: { type: String },
    profile: { type: String },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);

schema.pre('save', async function (next) {
  if (this.password) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

schema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

schema.method('toJSON', function () {
  const {
    __v, ...object
  } = this.toObject({ virtuals: true });
  object.id = object._id;
  object.profileUrl = object.profile ? `${API_URL}/images/users/${object.profile}` : '';
  return object;
});

const user = mongoose.model('user', schema, 'user');
module.exports = user;

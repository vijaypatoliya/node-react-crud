const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const appConstant = require('./constants/appConstant').config;

require('./config/db');

const app = express();

// cors middleware
app.use(cors());
app.use(require('./utils/responseHandler'));

// router
const routeV1 = require('./routes/index');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname)));
app.use('/api', routeV1);

app.listen(appConstant.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Application running on Port : ', appConstant.PORT);
});

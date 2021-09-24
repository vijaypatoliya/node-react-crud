const express = require('express');

const router = express.Router();
const multer = require('multer');
const userController = require('../../controllers/userController');
const authenticateJWT = require('../../middleware/passport');
const { rootPath } = require('../../constants/appConstant');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, `${rootPath}/images/users`);
  },
  filename(req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const fileFormat = (file.originalname).split('.')[1];
    cb(null, `${file.fieldname}-${uniqueSuffix}.${fileFormat}`);
  },
});

const upload = multer({ storage });

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/:id', userController.getUser);
router.put('/update-profile', authenticateJWT, upload.single('profileImage'), userController.updateProfile);

module.exports = router;

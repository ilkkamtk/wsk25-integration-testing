import express from 'express';
import {
  studentDelete,
  studentGet,
  studentListGet,
  studentPost,
  studentPut,
} from '../controllers/studentController.js';
import multer from 'multer';
import {body, param} from 'express-validator';
import {validate} from '../../middlewares.js';
import path from 'path';

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // preserves extension
    const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, filename);
  },
});

const fileFilter = (request, file, cb) => {
  if (file.mimetype.includes('image')) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({storage, fileFilter});

const router = express.Router();

// no generics here because of types in controllers
router
  .route('/')
  .get(studentListGet)
  .post(
    upload.single('image'),
    body('student_name').notEmpty().escape(),
    body('birthdate').isDate(),
    validate,
    studentPost
  );

router
  .route('/:id')
  .get(param('id'), studentGet)
  .put(
    param('id'),
    body('student_name').escape().optional(),
    body('birthdate').isDate().optional(),
    validate,
    studentPut
  )
  .delete(param('id'), studentDelete);

export default router;

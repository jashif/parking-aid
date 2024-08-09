import express from 'express';
import * as controller from '../controllers/parking-aid-controller';
import { asyncErrorMiddleware } from '../middlewares/async-middleware';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });
const router = express.Router();
router.post('/upload',upload.single('image'), asyncErrorMiddleware(controller.processParkingRules));

export default router;

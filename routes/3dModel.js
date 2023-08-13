import express from "express";
import multer from 'multer';

import { uploadModel, getModels } from "../controllers/models.js";

const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.post('/upload',upload.single('model'), uploadModel)
router.get('/getmodels', getModels)

export default router
import express from 'express';
import { routes } from './constant.js';
import { VideoUpload } from './controller/VideoController.js';
import { upload } from './Middleware/VideoUploadMiddleware.js';


const router = express.Router();
router.post(routes.VIDEO_UPLOAD, upload.fields([
    {
      name: "videos",
      maxCount: 5,
    },
  ]), 
  VideoUpload);



  export default router;


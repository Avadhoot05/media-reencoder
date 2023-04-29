import express from 'express';
import { routes } from './constant.js';
import { VideoUpload } from './controller/VideoController.js';
import { upload } from './middleware/VideoUploadMiddleware.js';


const router = express.Router();
router.post(routes.VIDEO_UPLOAD, upload.fields([
    {
      name: "video",
      maxCount: 5,
    },
  ]), 
  VideoUpload);



  export default router;


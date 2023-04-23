import multer from 'multer';
import path from 'path';

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, './public/video')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
})

export const upload = multer({ 
    storage: storage, 
    fileFilter: function(req, file, cb) {
        console.log(file.originalname);
        let ext = path.extname(file.originalname);

        if(ext != ".mkv" && ext != ".mp4")
        {
            console.log(ext);
            return cb(new Error("Only videos allowed"));
        }

        cb(null, true);
    }  
})


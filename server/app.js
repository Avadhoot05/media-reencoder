// import ffmpeg from 'fluent-ffmpeg';
import express from 'express';

const app = express();
app.use(express.json());

const gotRequest =  (req,res) => {
    console.log("got req");
    if(req)
        console.log(req.body);
    else
        console.log("no body")
}


const router = express.Router();
router.post('/upload', gotRequest);
app.use('/', router);


const port =  3000;
app.listen(port, () => {
    console.log(`Server is running at ${port}`);
  });


// (function() {
//     const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
//     console.log(ffmpegPath);
//     const ffmpeg = require('fluent-ffmpeg');
//     ffmpeg.setFfmpegPath(ffmpegPath);

//     // ffmpeg("vid.mp4")
//     // .output(`OUTPUT.mp4`)
//     // .videoCodec("libx264")
//     // .size("1280x720")
//     // .on("error", function(err){
//     //     console.log(err);
//     // })
//     // .run();

//     ffmpeg("vid.mp4")
//     .output(`OUTPUTwith15FPS.mp4`)
//     .videoCodec("libx264")
//     .fps(500)
//     .on("error", function(err){
//         console.log(err);
//     })
//     .run();
// })();
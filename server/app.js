// import ffmpeg from 'fluent-ffmpeg';
import express from 'express';
import cors from 'cors';
import bodyParser from "body-parser";
import router from "./routes.js";

const app = express();
app.use(express.json());
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
var oneWeek = 86400000*7;
app.use(express.static("./public", { maxAge: oneWeek, lastModified: true }));

app.use('/', router);

const port =  process.env.PORT || 3000;
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
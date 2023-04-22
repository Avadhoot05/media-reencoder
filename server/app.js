// import ffmpeg from 'fluent-ffmpeg';

// const app = express();
// app.use(express.json());




// const port =  3000;
// app.listen(port, () => {
//     console.log(`Server is running at ${port}`);
//   });


(function() {
    const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
    console.log(ffmpegPath);
    const ffmpeg = require('fluent-ffmpeg');
    ffmpeg.setFfmpegPath(ffmpegPath);

    // ffmpeg("vid.mp4")
    // .output(`OUTPUT.mp4`)
    // .videoCodec("libx264")
    // .size("1280x720")
    // .on("error", function(err){
    //     console.log(err);
    // })
    // .run();

    ffmpeg("vid.mp4")
    .output(`OUTPUTwith15FPS.mp4`)
    .videoCodec("libx264")
    .fps(500)
    .on("error", function(err){
        console.log(err);
    })
    .run();
})();
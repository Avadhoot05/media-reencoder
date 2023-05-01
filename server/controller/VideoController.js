import ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import ffmpegPath from '@ffmpeg-installer/ffmpeg';
 
export const VideoUpload =  (req,res) => {

    let {newUploadedFileName, format} = req.body;
    const file = req.files.video[0];

    console.log("middleware file name");
    console.log(newUploadedFileName);
    console.log("file");
    console.log(file);



    try {
        
        ffmpeg.setFfmpegPath(ffmpegPath.path);
    
        // ffmpeg("vid.mp4")
        // .output(`OUTPUT.mp4`)
        // .videoCodec("libx264")
        // .size("1280x720")
        // .on("error", function(err){
        //     console.log(err);
        // })
        // .run();

        

        let strFilePathToProcess = path.join('./public', 'uploaded', newUploadedFileName + ".mkv");        
        console.log("file path to reencode");
        console.log(strFilePathToProcess);

        let strOutputFilePath = path.join('./public', 'reencoded', newUploadedFileName + format);
        console.log("file path to output");
        console.log(strOutputFilePath);

        ffmpeg(strFilePathToProcess)
        .output(strOutputFilePath)
        .videoCodec("libx264")
        .fps(20)
        .on("error", function(err){
            console.log(err);
        })
        .run();
        
      res.json({ fileId: newUploadedFileName });
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
}
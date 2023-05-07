import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from '@ffmpeg-installer/ffmpeg';
import { ACTION, Job } from './processor.js';
import path from 'path';

export class Encoder
{
    constructor()
    {
        ffmpeg.setFfmpegPath(ffmpegPath.path);
    }


    /**
     * 
     * @param {Job} job 
     * @param {*} onComplete 
     */
    Encode(job, onComplete)
    {
        let action = job.GetAction();
        switch(action)
        {
            case ACTION.FPS:
                this.EncodeFPS(job, onComplete);
                break;
            case ACTION.RESOLUTION:
                this.EncodeResolution(job, onComplete);
                break;
        }
    }

    /**
     * 
     * @param {Job} job 
     * @param {*} onComplete 
     */
    EncodeFPS(job, onComplete)
    {
        let fileNameWithOriginalFormat = job.GetFileNameWithOriginalFormat();
        let actionParam =  job.GetActionParam();
        let fps = actionParam["FPS"];
        console.log("[FPS] value ", fps);
        
        let strFilePathToProcess = path.join('./public', 'uploaded', fileNameWithOriginalFormat);        
        console.log("[FPS] uploaded file ", strFilePathToProcess);

        let strOutputFilePath = path.join('./public', 'reencoded', fileNameWithOriginalFormat);
        console.log("[FPS] output file ", strOutputFilePath);
        
        ffmpeg(strFilePathToProcess)
        .output(strOutputFilePath)
        .videoCodec("libx264")
        .fps(fps)
        .on("error", function(err){
            console.log(err);
            onComplete(null, err);
        })
        .on("progess", function(progress){
            console.log(progress);
        })
        .on("end", function(){
            onComplete({
                "strOutputFilePath": strOutputFilePath
            }, null);
        })
        .run();
    }

    EncodeResolution()
    {
        //TODO:: code resolution change
    }
}
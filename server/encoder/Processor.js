import { Encoder } from "./encoder.js";


export const ACTION = Object.freeze({
    NONE: 0, 
    FPS: 1
});

export class Job
{
    constructor(fileName, originalFormat, connection, action, actionParam)
    {
        this.fileName = fileName;
        this.originalFormat = originalFormat;
        this.connection = connection;
        this.action = action;
        this.actionParam = actionParam;
    }

    GetFileName()
    {
        return this.fileName;
    }

    GetFileNameWithOriginalFormat()
    {
        return this.fileName + this.originalFormat;
    }

    GetConnection()
    {
        return this.connection;
    }

    GetAction()
    {
        return this.action;
    }

    GetActionParam()
    {
        return this.actionParam;
    }


}

export class Processor
{
    constructor()
    {
        /** @type {Array<Job>}*/
        this.queue = [];
        this.bProcessing = false;
        this.encoder = null;
        this.Init();
    }

    /**
     * @returns {void} 
     */
    Init()
    {
        this.encoder = new Encoder();
    }

    /**
     * @param {Job} job 
     */
    AddToQueue(job)
    {
        this.queue.push(job);
    }


    ProcessJobs()
    {
        if(this.bProcessing)
        {
            console.log("Processing other media");
            return false;
        }
        
        if(this.queue.length == 0) {
            this.bProcessing = false;
            return false;
        }
        
        let job = this.queue[0];
        this.queue.splice(0, 1);
        this.bProcessing = true;
        let connection = job.GetConnection();
        this.encoder.Encode(job, (res, err) => {
            this.bProcessing = false;

            let resp;
            if(err)
            {
                console.log("error" ,  job.GetFileName());
                resp = {
                    "type": "reencodeResponse",
                    "bSuccess": false,
                }  
            }
            else
            {
                console.log("Done" ,  res);
                resp = {
                    "type": "reencodeResponse", 
                    "bSuccess": true,
                    "strOutputFilePath": res["strOutputFilePath"]
                };
               
            }

             //send packet via conn
            connection.send(JSON.stringify(resp));
            this.ProcessJobs();

        });



    }
}
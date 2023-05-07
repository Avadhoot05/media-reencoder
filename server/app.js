// import ffmpeg from 'fluent-ffmpeg';
import express from 'express';
import cors from 'cors';
import bodyParser from "body-parser";
import router from "./routes.js";
import dotenv from 'dotenv';
import { Processor, Job } from './encoder/processor.js';
import { fileURLToPath } from 'url';

import path from 'path';
import http from 'http';
import webSocket from 'websocket';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
dotenv.config({ path: "./config.env" });

app.use("/public", express.static(path.join(__dirname, "public")));
app.use('/', router);

const port =  process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running at ${port}`);
  });


//ws
const WS_SERVER_PORT = process.env.WS_SERVER_PORT; 
const server = http.createServer();
server.listen(WS_SERVER_PORT);
console.log(`WS Server is running at ${WS_SERVER_PORT}`);

const wsServer = new webSocket.server({
	httpServer: server
});

let processor = new Processor();



wsServer.on('request', function(req) {
  	console.log('[', new Date(), '] ', 'recieved new connection from origin : ', req.origin);

	const connection = req.accept(null, req.origin);
  
	connection.on('message', function(message) 
	{
		if(message.type == 'utf8')
		{
			console.log('[', new Date(), '] ', 'recieved message  : ', message.utf8Data);
		
			const data = JSON.parse(message.utf8Data);
			if(data.type == 'enque')
			{
				//TODO: make a redis bull queue similar to this.
				let job = new Job(data.newUploadedFileName, data.uploadedFileFormat, connection, data.action, data.actionParam);
				processor.AddToQueue(job);
				processor.ProcessJobs();
			}
		}	
	});
  }
);
// import ffmpeg from 'fluent-ffmpeg';
import express from 'express';
import cors from 'cors';
import bodyParser from "body-parser";
import router from "./routes.js";
import dotenv from 'dotenv';


import http from 'http';
import webSocket from 'websocket';


const app = express();
app.use(express.json());
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
dotenv.config({ path: "./config.env" });
var oneWeek = 86400000*7;
app.use(express.static("./public", { maxAge: oneWeek, lastModified: true }));

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
})

const processQueue = [];

wsServer.on('request', function(req) {
  	console.log('[', new Date(), '] ', 'recieved new connection from origin : ', req.origin);

	const connection = req.accept(null, req.origin);
  
	connection.on('message', function(message) 
	{
		if(message.type == 'utf8')
		{
			console.log('[', new Date(), '] ', 'recieved message  : ', message.utf8Data);
		
			const data = JSON.parse(message.utf8Data);
			if(data.action == 'enque')
			{
				//TODO: make a redis bull queue similar to this.
				processQueue.push({
					'fileId' : data.fileId, 
					'connection': connection	
				});
			}
			
			console.log("Queue>>");
			console.log(processQueue);
			connection.sendUTF(message.utf8Data);
		}	
	});
  }
);
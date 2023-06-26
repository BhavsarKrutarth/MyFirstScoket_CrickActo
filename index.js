const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const port = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

    io.on('connection', (socket) => {
    console.log('a user connected');
    // let obj = {
    //     channel_name:"Krutarth"
    //     ,Matchid:1
    //     ,Message:"This is system genrated message"
    // }

    // setTimeout(() => {
    //     socket.emit("CustomeEvent",{data: obj})
    // },4000);

    // socket.on("ClientEvent",(data) => {
    //     console.log("client data received",data);
    // })

    socket.on('SendMessage',(data)=>{
        io.emit("received_message",data);
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
  });
  

server.listen(port, () => {
  console.log('Sever Running at http://localhost:'+ port);
});
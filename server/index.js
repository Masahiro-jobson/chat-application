// We need three variables to build server together with a socket.io
const express = require("express");
const app = express();
const http = require("http");
// cors are important for socket.io because it handles a lot of cors issue
const cors = require("cors");
const {Server} = require("socket.io");

// This function resolve many of cors issues.
app.use(cors());
// This variable is for creating server.
const server = http.createServer(app);

const io = new Server(server, {
// cors = a mechanism that allows web applications to access resources from different domains
    cors: {
// origin tells our server which url (server) is called and making a call on our socke.io server
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],

    },
});

// io.on listens certain event in the bracket.
// connection is the event that detects if someone connected to this socket io server.
io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
// pass through the frontend room id through this data variable
    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}` );
    })

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);

    })
// It runs automatically when the user is gone.
    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);

    });

});

server.listen(3001, () => {
    console.log("SERVER RUNNING");
})
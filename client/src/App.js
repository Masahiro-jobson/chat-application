import { useState } from "react";
import io from "socket.io-client";
import './App.css';
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001")

function App() {
  const [username, setUsername] = useState("")
  const [room, setRoom] = useState("")
  const [showChat, setShowChat] = useState(false)


  const joinRoom = () => {
    if (username !== "" && room !== ""){
      // room second arguments are received as function in the index.js
      // as data
      socket.emit("join_room", room)
      // after joining room update showChat status as current state (true)
      setShowChat(true);

  }
}

  return (
    <div className="App">
      {/* showChat defines how chat window works.
      If showChat is false show the entery window but
      if it's true, show the actual chat window */}
      {!showChat ?(
      <div className="joinChatContainer">
      <h3>Join A Chat</h3>
      {/* target.value is accessing the value of the input */}
      <input type = "text" placeholder="John..." 
      onChange={(e) => {setUsername(e.target.value)}}/>
      <input type = "text" placeholder="Room ID..."
      onChange={(e) => {setRoom(e.target.value)}}/><br/>
      <button onClick={joinRoom}>Join A Room</button>
      </div>
      )
    : (
      <Chat socket ={socket} username={username} room={room}/>
    )}

    </div>
  );
};
export default App;

import { useState } from "react";
import io from "socket.io-client";
import './App.css';

const socket = io.connect("http://localhost:3001")

function App() {
  const [userName, setUsername] = useState("")
  const [room, setRoom] = useState("")

  const joinRoom = () => {
    if (userName !== "" && room !== ""){
      // room second arguments are received as function in the index.js
      // as data
      socket.emit("join_room", room)

  }
}

  return (
    <div className="App">
      <h3>Join A Chat</h3>
      {/* target.value is accessing the value of the input */}
      <input type = "text" placeholder="John..." 
      onChange={(e) => {setUsername(e.target.value)}}/>
      <input type = "text" placeholder="Room ID..."
      onChange={(e) => {setRoom(e.target.value)}}/><br/>
      <button onClick={joinRoom}>Join A Room</button>
    </div>
  );
};
export default App;

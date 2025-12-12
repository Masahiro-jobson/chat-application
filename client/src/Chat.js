import { useEffect, useState } from "react";

function Chat({socket, username, room }) {
    const [currentMessage, setCurrentMessage] = useState("");
    
    // async command allows call-back function to wait for the message
    // to be sent.
    const sendMessage = async () => {
        if (currentMessage !== ""){
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: 
                new Date(Date.now()).getHours() + 
                ":" + 
                new Date(Date.now()).getMinutes()
            };

// First argument is just a name that the server listens for.
// Second argument is a name that I actually send.
// await basically stops the execution of an async function until a Promise resolves.
            await socket.emit("send_message", messageData);


        }
    }

// This useEffect listen whenever there is any changes to our socket
// and listen everytime thre any received another message.
// This hook will run only if socket instance changes such as recreating
// the connection.
useEffect (() => {
    socket.on("receive_message", (data) => {
        console.log(data);
    })

}, [socket])


  return (
    <div>
        <div className="chat-header">
            <p>Live Chat</p>
        </div>
        <div className="chat-body"></div>
        <div className="chat-footer">
            <input type="text" placeholder="Hey..." onChange={(e) => {setCurrentMessage(e.target.value)}}/>
            <button onClick={sendMessage}>&#9658;</button>
        </div>
      
    </div>
  )
}

export default Chat;

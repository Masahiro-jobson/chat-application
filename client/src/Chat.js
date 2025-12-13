import { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
// props are passed value from parent component (App.js)
// Here, socket, username, and room are passed.
function Chat({socket, username, room }) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    
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
             setMessageList((list) => [...list, messageData]);
             setCurrentMessage("");


        }
    }

// This useEffect listen whenever there is any changes to our socket
// and listen everytime thre any received another message.
// This hook will run only if socket instance changes such as recreating
// the connection.
useEffect(() => {
  const handleReceiveMessage = (data) => {
    console.log("Received:", data);
    setMessageList((list) => [...list, data]);
  };

  console.log("Attaching listener");
  socket.on("receive_message", handleReceiveMessage);

  return () => {
    console.log("Removing listener");
    socket.off("receive_message", handleReceiveMessage);
  };
}, [socket]);


  return (
    <div className="chat-window">
        <div className="chat-header">
            <p>Live Chat</p>
        </div>
        <div className="chat-body">
            <ScrollToBottom className="message-container">

            {messageList.map((messageContent) => {
                return (
                    <div className="message" id={username === messageContent.author ? "you" : "other"}>
                    <div>
                        <div className="message-content">
                            <p>{messageContent.message}</p>
                        </div>
                        <div className="message-meta">
                            <p id="time">{messageContent.time}</p>
                            <p id="author">{messageContent.author}</p>
                        </div>
                        
                    </div>
                </div>
                );
            })}
            </ScrollToBottom>
        </div>
        <div className="chat-footer">
            <input type="text" value={currentMessage} placeholder="Hey..." onChange={(e) => {setCurrentMessage(e.target.value)}}
              onKeyDown={(e) => {if (e.key === "Enter") {sendMessage();
                
    }
  }}/>
            <button onClick={sendMessage}>&#9658;</button>
        </div>
      
    </div>
  )
}

export default Chat;

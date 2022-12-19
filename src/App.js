import { useEffect,useState } from "react"
import io from "socket.io-client"
const socket = io.connect("http://localhost:3001")
function App() {
  
  // console.log(messageReceived);
  const [message, setMessage] = useState("")
  const [messageReceived, setMessageReceived] = useState([])

  const sendMessage =()=>{
    socket.emit("send_message", {message})
  }
  useEffect(() => {
    socket.on("receive_message", (data)=>{
      // console.log(data)
      setMessageReceived(data)
    })
  }, [messageReceived])


  
 
  return (
    <div className="app">
     <input placeholder="Send a message..." type="text" onChange={(e)=>setMessage(e.target.value)} />
     <button onClick={sendMessage}>Send</button>
     <h1>Message:</h1>
     <p>{messageReceived.message}</p>
    </div>
  );
}

export default App;

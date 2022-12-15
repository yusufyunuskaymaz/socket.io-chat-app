import { useEffect,useState } from "react"
import io from "socket.io-client"
const socket = io.connect("http://localhost:3001")
function App() {
  
  // console.log(messageReceived);
  const [message, setMessage] = useState("")
  const [messageReceived, setMessageReceived] = useState([])
  const [myMessages, setMyMessages] = useState([])
  const sendMessage =()=>{
    socket.emit("send_message", {message})
    setMyMessages([...myMessages,message])
  }
  useEffect(() => {
    socket.on("receive_message", (data)=>{
      // console.log(data)
      setMessageReceived([...messageReceived, data])
    })
  }, [messageReceived])

  // console.log(messageReceived)
  console.log(myMessages)
  // console.log("render");
  
 
  return (
    <div className="app">
     <input placeholder="Send a message..." type="text" onChange={(e)=>setMessage(e.target.value)} />
     <button onClick={sendMessage}>Send</button>
     <h1>Message:</h1>
     {messageReceived.map((message, index)=>{
      return (
        <p key={index}>{message.data.message}</p>
      )
     })}
    </div>
  );
}

export default App;

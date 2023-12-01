
import { useEffect, useState } from 'react'
import io from "socket.io-client"
const socket = io("http://localhost:3000")


function App() {


  const [room,setRoom]=useState('')
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault()

    socket.emit('send_message',{message,room})

  }
  useEffect(()=>{

    socket.on('received',(message)=>{
      setMessages((messages)=>[...messages,message])
    })
  },[])

  //room
  const joinRoom=()=>{

    socket.emit("join_room",room)
  }

  return (
    <div>
     <input type="text" onChange={e=>setRoom(e.target.value)} placeholder='Enter room number' value={room} />
      <button onClick={joinRoom} >join room</button>
      <form onSubmit={handleSubmit}>
        
        <input type="text" value={message} placeholder="Your message" onChange={(event) => setMessage(event.target.value)} />
        <button type="submit">Send</button>
      </form>
      <ul>
        {messages.map((message, index) => (
          
          <li key={index}>
          
             {message}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App

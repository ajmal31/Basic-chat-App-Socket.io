
import { useEffect, useState } from 'react'
import io from "socket.io-client"
const socket = io("http://localhost:3000")


function App() {


  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault()

    socket.emit('send_message',{name,message})

  }
  useEffect(()=>{

    socket.on('message',(message)=>{
      setMessages((messages)=>[...messages,message])
    })
  },[])

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} placeholder="Your name" onChange={(event) => setName(event.target.value)} />
        <input type="text" value={message} placeholder="Your message" onChange={(event) => setMessage(event.target.value)} />
        <button type="submit">Send</button>
      </form>
      <ul>
        {messages.map((message, index) => (
          
          <li key={index}>
            {console.log('ahi')}
            {message.name}: {message.message}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App

import logo from './logo.svg';
import './App.css';
import {io} from 'socket.io-client'
import { useEffect, useState } from 'react';

const socket = io("http://localhost:5000")

function App() {

  const [auth,setAuth] = useState(false)
  const [login, setLogin] = useState('')
  const [receiver, setReceiver] = useState('')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  useEffect(()=>{
    socket.on('receive_message', (message) => {
      setMessages([...messages,message])
    })
  },[messages])

  console.log(messages)

  const loginAction = () => {
    socket.emit('join_room',login)
    setAuth(true)
  }

  const sendMessage = () => {
    socket.emit("send_message", {
      sender: login,
      receiver: receiver,
      message: message
    })
  }

  if (!auth) {
    return (
      <div>
        <input type="text" placeholder='enter name' value={login} onChange={(e)=>setLogin(e.target.value)}/>
        <button onClick={loginAction}>login</button>
      </div>
    );
  } else {
    return (
      <div>
        <h1>chat</h1>
        <div></div>
        <h2>Send messaege</h2>
        <input type="text" value={receiver} onChange={(e)=>setReceiver(e.target.value)} placeholder='enter name your friend' />
        <textarea value={message} onChange={(e)=> setMessage(e.target.value)} placeholder='enter message'></textarea>
        <button onClick={sendMessage}>send message</button>
      </div>
    )
  }
}

export default App;

import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import io from 'socket.io-client'

const socket = io("http://localhost:4000")

const Home = () => {
  const [auth,setAuth] = useState(false)
  const [activeChat,setActiveChat] = useState(false)

  const [message, setMessage] = useState("");
  // const [messages, setMessages] = useState([]);
  
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [room,setRoom] = useState(-1)

  const [password, setUserPassword] = useState("");
  const [email, setUserEmail] = useState("");

  const [problemDescription, setProblemDescription] = useState("");
  const [problemTitle, setProblemTitle] = useState("");


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .post("http://localhost:4000/api/account/relogin", null, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          setAuth(true);
        })
        .catch(() => {
          localStorage.removeItem("token");
        });
    }
  }, []);

  const registerAction = useCallback(() => {
    axios
      .post("http://localhost:4000/api/account/register", { email, password })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        setAuth(true);
        setUserEmail("");
        setUserPassword("");
      })
      .catch((err) => {
        console.error("Registration failed:", err.response?.data);
      });
  }, [email, password]);

  const loginAction = useCallback(() => {
    axios
      .post("http://localhost:4000/api/account/login", { email, password })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        setAuth(true);
        setUserEmail("");
        setUserPassword("");
      })
      .catch((err) => {
        console.error("Login failed:", err.response?.data);
      });
  }, [email, password]);

  //
  const creatrTicket = useCallback(() =>{
    axios
    .post("http://localhost:4000/api/chat/ticket", {
      title: problemTitle,
      body: problemDescription
    })
      .then((response) => {
        console.log("Тикет успешно создан:", response.data);
        socket.emit("joinRoom", response.data.id)
        setRoom(response.data.id)
    })
    .catch((error) => {
        console.error("Ошибка при создании тикета:", error);
    });
  }, [problemTitle, problemDescription])

  const SendMasseg = useCallback(() =>{
    // При отправке сообщения оно должно отправлять апи запрос который будет сохранять это смс в базу данных
    socket.emit("sendMessage", {room:room, name: "User", text: message})
    console.log(4)
  },[message,room])
  // const [tickets, setGetTickets] = useState([]);
  
  const startChat = () => {
    if(!problemTitle || !problemDescription){
      console.error("Название проблемы и описание проблемы обязательны.");
      console.log(5)
      return;
    }
    creatrTicket();
    setActiveChat(true)
    // console.log(startChat)
  }
  //

  const getLayoutChat = () => {
    if (isChatOpen) {
      if (auth && activeChat) {
        return (
          <div className="chat-container">
            <textarea
              className="chat-footer textarea"
              name="message"
              id="message"
              placeholder="Type your message here..."
              value={message}
              onChange={(e)=>setMessage(e.target.value)}
            ></textarea>
            <button className="chat-footer button" onClick={SendMasseg}>
              Send
            </button>
          </div>
        );
      }
      if (auth && activeChat === false) {
        return (
          <div className="chat-container">
            <input
              className="chat-footer input"
              type="text"
              placeholder="Title"
              value={problemTitle}
              onChange={(e) => setProblemTitle(e.target.value)}
            />
            <input
              className="chat-footer input"
              type="text"
              placeholder="Description"
              value={problemDescription}
              onChange={(e) => setProblemDescription(e.target.value)}
            />
            <button className="chat-footer button" onClick={startChat}>
              Start Chat
            </button>
          </div>
        );
      }
      if (auth === false) {
        return (
          <div className="chat-container auth">
            <input
              className="chat-footer input"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setUserEmail(e.target.value)}
            />
            <input
              className="chat-footer input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setUserPassword(e.target.value)}
            />
            <button className="chat-footer button" onClick={loginAction}>
              Login
            </button>
            <button className="chat-footer button" onClick={registerAction}>
              Register
            </button>
          </div>
        );
      }
    }
  };
  

  const toggleChat = () => setIsChatOpen((prev) => !prev);

  return (
    <>
      <button onClick={toggleChat}>chat</button>
      {
        getLayoutChat()
      }
    </>
  )
};

export default Home;
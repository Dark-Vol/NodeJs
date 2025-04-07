import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import io from "socket.io-client"

const socket = io("http://localhost:4000")

const Home = () => {
  const [auth,setAuth] = useState(false) // useAuth
  const [activeChat,setActiveChat] = useState(false)

  const [message, setMessage] = useState(""); // useChat
  const [messages, setMessages] = useState([]); // useChat

  const [isChatOpen, setIsChatOpen] = useState(false); // useChat
  const [room,setRoom] = useState(-1) // useChat

  const [password, setUserPassword] = useState(""); // useAuth
  const [email, setUserEmail] = useState(""); // useAuth

  const [problemDescription, setProblemDescription] = useState(""); // useChat
  const [problemTitle, setProblemTitle] = useState(""); // useChat

  // useAuth
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

  // useChat
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
        localStorage.setItem("roomId",response.data.id)
      })
      .catch((error) => {
        console.error("Ошибка при создании тикета:", error);
      });
  }, [problemTitle, problemDescription])

  const SendMasseg = useCallback(() =>{
    axios.post("http://localhost:4000/api/chat/message", {
          role: "User",
          room: room,
          text: message,
        }, {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        })
      .then((response) => {
        console.log("Сообщение сохранено:", response.data);
        socket.emit("sendMessage", { room, role: "User", text: message });
        setMessage("");
      })
      .catch((error) => {
        console.error("Ошибка при сохранении сообщения:", error.response?.data);
      });
  },[message,room])

  const CloseTicket = () => {
    axios.post("http://localhost:4000/api/chat/closeTicket", {
      id: room
    })
    .then((response)=>{
      console.log(response)
      setActiveChat(false)
      setIsChatOpen(false)
      setProblemTitle("")
      setProblemDescription("")
      localStorage.removeItem("roomId")
      socket.emit('closeTicket', {room})
      // Вызов события закрытие тикета
    })
    .catch((error) => {
      console.error("Ошибка при сохранении сообщения:", error);
    });
  }

  useEffect(() => {
    if (room !== -1) {
      axios
        .get(`http://localhost:4000/api/chat/message/${room}`)
        .then((response) => {
          setMessages(response.data.data);
        })
        .catch((error) => {
          console.error("Ошибка при загрузке сообщений:", error.response?.data);
        });
    }
  }, [room]);

  const startChat = () => {
    if(!problemTitle || !problemDescription){
      console.error("Название проблемы и описание проблемы обязательны.");
      return;
    }
    creatrTicket();
    setActiveChat(true)
  }

  const getRole =(message)=>{
    if (message.role) {
      return message.role
    }
    if (message.UserId) {
        return "User"
    } else {
        return "admin"
    }
  }

  useEffect(() => {
    const handleReceiveMessage = (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    };
    socket.on("receiveMessage", handleReceiveMessage);
    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, []);

  useEffect(() => {
    const savedRoom = localStorage.getItem("roomId");
    if (savedRoom) {
      setRoom(savedRoom)
      socket.emit("joinRoom", savedRoom)
      setIsChatOpen(true);
      setActiveChat(true);
    }
  }, []);
  //

  const getLayoutChat = () => {
    if (isChatOpen) {
      if (auth && activeChat) {
        return (
            <div className="chat-container">
              <div className="chat-header">
                <h1>Chat</h1>
              </div>
              <div className="chat-messages">
                {messages.map((message, index) => (
                  <div key={index} >
                    <b>From {getRole(message)}:</b>
                    <p>{message.text}</p>
                  </div>
                ))}
              </div>
            <div className="chat-input-container">
              <input
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="chat-input"
              />
              <button onClick={SendMasseg} className="chat-send-button">
                Send
              </button>
              <button onClick={CloseTicket}>
                Закрыть тикет
              </button>
            </div>
          </div>
        );
      }
      if (auth && activeChat === false) {
        return (
          <div className="chat-popup form-container">
            <input
              className="input"
              type="text"
              placeholder="Title"
              value={problemTitle}
              onChange={(e) => setProblemTitle(e.target.value)}
            />
            <input
              className="input"
              type="text"
              placeholder="Description"
              value={problemDescription}
              onChange={(e) => setProblemDescription(e.target.value)}
            />
            <button className="button" onClick={startChat}>
              Start Chat
            </button>
          </div>
        );
      }
      if (auth === false) {
        return (
          <div className="chat-popup form-container">
            <input
              className="input"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setUserEmail(e.target.value)}
            />
            <input
              className="input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setUserPassword(e.target.value)}
            />
            <button className="button" onClick={loginAction}>
              Login
            </button>
            <button className="button" onClick={registerAction}>
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
      <button className="open-button" onClick={toggleChat}>
        Chat
      </button>
      {getLayoutChat()}
    </>
  );
};

export default Home;
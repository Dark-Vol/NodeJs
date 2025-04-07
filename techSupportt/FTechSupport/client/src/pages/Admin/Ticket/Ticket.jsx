import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

const socket = io("http://localhost:4000");

const Ticket = () => {
    const { id } = useParams();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [isClosed, setIsClosed] = useState(false);

    useEffect(() => {
        socket.emit("joinRoom", id);
        async function loadMessages() {
            try {
                const resp = await axios.get(`http://localhost:4000/api/chat/message/${id}`);
                setMessages(resp.data.data);
                const ticketResp = await axios.get(`http://localhost:4000/api/chat/ticket/state/${id}`);
                // http://localhost:4000/api/ticket/${id}
                if (ticketResp.data.statusClose) {
                    handleTicketClosed();
                }
            } catch (error) {
                console.error("Ошибка загрузки сообщений:", error);
            }
        }
        loadMessages();
        return () => {
            socket.emit("leaveRoom", id);
        };
    }, [id]);
    

    useEffect(() => {
        socket.on("getCloseTicket", handleTicketClosed);
        const handleReceiveMessage = (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        };
        socket.on("receiveMessage", handleReceiveMessage);
        return () => {
            socket.off("receiveMessage", handleReceiveMessage);
            socket.off("getCloseTicket", handleTicketClosed);
        };
    }, [id]);

    const handleTicketClosed = () => {
        if (!isClosed) {
            setIsClosed(true);
            setMessages((prevMessages) => [
                ...prevMessages,
                { 
                    role: "system", 
                    text: "Тикет закрыт", 
                    room: id 
                }
            ]);
        }
    };

    const handleSendMessage = async () => {
        if (message.trim() === "" || isClosed) return;
        const newMessage = { role: "admin", text: message, room: id };
        try {
            await axios.post("http://localhost:4000/api/chat/message", newMessage, {
                headers: { Authorization: localStorage.getItem("token") }
            });
            socket.emit("sendMessage", newMessage);
            setMessage("");
        } catch (error) {
            console.error("Ошибка отправки сообщения:", error);
        }
    };

    const getRole = (message) => {
        if (message.role) {
            return message.role
        }
        if (message.UserId) {
            return "User"
        } else {
            return "admin"
        }
    }

    return (
        <div className="chat-container">
            <div className="chat-header">
                <h1>Chat</h1>
                <h3>Ticket: {id}</h3>
                {isClosed && <p style={{ color: "red" }}>Этот тикет закрыт</p>}
            </div>
            <div className="chat-messages">
                {messages.map((message, index) => (
                    <div key={index}>
                        <b>From {getRole(message)}:</b>
                        <p>{message.text}</p>
                    </div>
                ))}
            </div>
            {!isClosed && (
                <div className="chat-input-container">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="chat-input"
                    />
                    <button onClick={handleSendMessage} className="chat-send-button">
                        Send
                    </button>
                </div>
            )}
        </div>
    );
};

export default Ticket;

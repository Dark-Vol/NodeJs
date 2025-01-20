import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

const socket = io("http://localhost:4000");

const Ticket = () => {
    const { id } = useParams();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        console.log("Подключение к комнате:", id);
        socket.emit("joinRoom", id);
        async function loadMessages() {
            try {
                const resp = await axios.get(`http://localhost:4000/api/chat/message/${id}`);
                setMessages(resp.data.data);
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
        const handleReceiveMessage = (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        };
        socket.on("receiveMessage", handleReceiveMessage);
        return () => {
            socket.off("receiveMessage", handleReceiveMessage);
        };
    }, []);

    const handleSendMessage = async () => {
        if (message.trim() === "") return;
        const newMessage = {
            name: "admin",
            text: message,
            ticketId: id,
        };
        try {
            await axios.post("http://localhost:4000/api/chat/message", newMessage);
            socket.emit("sendMessage", newMessage);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            setMessage("");
        } catch (error) {
            console.error("Ошибка отправки сообщения:", error);
        }
    };

    return (
        <div>
            <h3>Ticket: {id}</h3>
            <div>
                {messages.map((message, index) => (
                    <div key={index}>
                        <b>From {message.name}:</b>
                        <p>{message.text}</p>
                    </div>
                ))}
            </div>
            <textarea
                name="message"
                id="message"
                placeholder="Type your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
};

export default Ticket;

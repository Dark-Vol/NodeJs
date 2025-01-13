import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import io from 'socket.io-client'

const socket = io("http://localhost:4000")

const Ticket = () => {

    // const params = useParams()
    const { id } = useParams();
    const [messages, setMessages] = useState([]);

    useEffect(()=>{
        console.log("подключение к комнате:", id);
        socket.emit("подключение к комнате:", id )

        socket.on("receiveMessage", (data) => {
            console.log(data)
            setMessages(data)
        })

        socket.on("receiveMessage", (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });
        return () => {
            socket.off("previousMessages");
            socket.off("receiveMessage");
        };
    },[id])
    

    return (
        <div>
            <h3>Ticket: {id}</h3>
            <div className="messages">
                {messages.map((msg) => (
                <div key={msg.id}>
                    <strong>{msg.name}:</strong> {msg.text}
                </div>
                ))}
            </div>
        </div>
    )
}

export default Ticket
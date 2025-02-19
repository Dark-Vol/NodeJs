import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Admin = () => {
    const [auth, setAuth] = useState(false);

    const [email, setAdminEmail] = useState('');
    const [password, setAdminPassword] = useState('');

    const [ticketsGet, setGetTickets] = useState([]);

    const navigate = useNavigate();
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios.post("http://localhost:4000/api/admin/relogin", null, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((res) => {
                    localStorage.setItem("token", res.data.token);
                    setAuth(true);
                    LoadTickets();
                })
                .catch(() => {
                    localStorage.removeItem("token");
                });
            }
        }, []);

        const loginAction = useCallback(() => {
            axios.post("http://localhost:4000/api/admin/login", { email, password })
                .then((res) => {
                    localStorage.setItem("token", res.data.token);
                    setAuth(true);
                    setAdminEmail("");
                    setAdminPassword("");
                    LoadTickets();
                })
                .catch((err) => {
                    console.error("Login failed:", err.response?.data);
                });
            }, [email, password]);
        
        const LoadTickets = useCallback(() => {
            axios.get("http://localhost:4000/api/admin/ticket", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            })
            .then((res) => {
                setGetTickets(res.data);
            })
            .catch((err) => {
                console.error("Failed to load tickets:", err.response?.data);
            });
        });

        const handleTicketClick = (ticketId) => {
            navigate(`/admin/ticket/${ticketId}`);
        };

    const getLayoutAdmin = () => {
        if (auth === true) {
            if (ticketsGet.length === 0) {
                return (
                    <div>
                        <h1>Tickets</h1>
                        <p>No tickets</p>
                    </div>
                );
            }
            return (
                <div>
                    <h1>Tickets</h1>
                    <ul>
                        {ticketsGet.map((ticket) => (
                            <li key={ticket.id}>
                                <p>{ticket.title}</p>
                                <p>{ticket.body}</p>
                                <p>{ticket.statusClose ? "Closed" : "Open"}</p>
                                <button onClick={(e)=>handleTicketClick(ticket.id)}>Открыть</button>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
        if (auth === false){
            return (
                <div>
                    <h2>Admin Login</h2>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setAdminEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setAdminPassword(e.target.value)}
                    />
                    <button onClick={loginAction}>Login</button>
                </div>
            );
        }
    };

    return (
        <>
            {getLayoutAdmin()}
        </>
    );
};

export default Admin;
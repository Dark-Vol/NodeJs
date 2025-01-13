import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TicketChat = () => {
    const { ticketId } = useParams();
    const [ticket, setTicket] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTicket = async () => {
            try {
                const { data } = await axios.get(`https://localhost:4000/api/admin/tickets/${ticketId}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setTicket(data);
            } catch (err) {
                setError('Error fetching ticket details.');
            }
        };
        fetchTicket();
    }, [ticketId]);

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    return ticket ? (
        <div>
            <h1>{ticket.title}</h1>
            <p>{ticket.description}</p>
            <p>Status: {ticket.status}</p>
        </div>
    ) : (
        <p>Loading ticket details...</p>
    );
};

export default TicketChat;

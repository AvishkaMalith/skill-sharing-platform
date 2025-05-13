import { useEffect, useState } from 'react';
import axios from 'axios';

function HomePage() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8080/oauth2/user', { withCredentials: true })
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error('Error fetching user:', error);
            });
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
            <h1>Welcome, {user.userName}</h1>
            <p>Email: {user.userEmail}</p>
            <img src={user.profilePictureUrl} alt="Profile" style={{ borderRadius: "50%", width: "150px", height: "150px" }} />
        </div>
    );
}

export default HomePage;

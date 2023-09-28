import { useState, useEffect } from "react";
import axios from "axios";

function User() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/getUsers')
            .then(users => setUsers(users.data))
            .catch(err => console.log(err))
    }, [])
    return (
        <div style={{color:"white"}}>
            <h1>User:</h1>
            <br />
            <div>
                {console.log(users)}
                <p>{users[0].name}</p>
                <p>{users[0].email}</p>
                <p>{users[0].password}</p>
                <p>{users[0].permission}</p>
            </div>
        </div>
    );
}

export default User;
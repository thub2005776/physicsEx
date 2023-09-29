import { useState, useEffect } from "react";
import axios from "axios";
// import bids1 from '../../assets/bids1.png'
// import { Link } from 'react-router-dom';
// import { AiFillHeart } from "react-icons/ai";



function User() {
    const [thematics, setThematics] = useState([]);

    useEffect(() => {
      axios.get('http://localhost:3001/getThematics')
        .then(thematics => setThematics(thematics.data))
        .catch(err => console.log(err))
    }, [])

    function ThematicItem ({thematic}) {
        return (
            <>
                <h3>{thematic.thematic}</h3>
            </>
        )
    }
    
    return (
        <div style={{color:"white"}}>
            <p>Start</p>
            {thematics.map(them => (
                <ThematicItem
                    key={them.code}
                    thematic={them}
                />
            ))}
            <p>End</p>
        </div>
    );
}

export default User;
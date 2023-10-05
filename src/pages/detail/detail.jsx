import React from 'react'
import { useState, useEffect } from "react";
import { useLocation } from 'react-router';
import axios from "axios";

import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

function Detail () {
    const [exercises, setExercises] = useState([]);
    useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER_URL + "exercises")
            .then(exercises => setExercises(exercises.data))
            .catch(err => console.log(err))
    }, []);
    
    const location = useLocation();
    const path = location.pathname.split('/')[2]
    // console.log(path);
    const exercise = exercises.find((p) => p.no === path);
    return (
        exercise ? (
            <div>
            <h1>Chi tiet bai tap</h1>
            <p>Dap an</p>
            {console.log(exercise.subThematic)}
        </div>
        ): <p>loading...</p>
    )
}

export default Detail;
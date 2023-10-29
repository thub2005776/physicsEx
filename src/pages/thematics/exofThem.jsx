
import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import { Exercise } from "../../components";

const ExOfThem = () => {
    const [exercises, setExercises] = useState([]);
    const [thematics, setThematics] = useState([]);

    useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER_URL + "exercises")
            .then(exercises => setExercises(exercises.data))
            .catch(err => console.log(err))
    }, []);

    useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER_URL + "thematics")
            .then(them => setThematics(them.data))
            .catch(err => console.log(err))
    }, []);

    const location = useLocation();
    const code = location.pathname.split('/')[2]
    const exercise = exercises.filter(f => f.subThematic === code);
    const thematic = thematics.find(f => f.code === code);
    return(
        exercises && exercise && thematics && thematic &&
        <div className="text-white">
            <h3 className="text-center sm:text-3xl text-lg font-bold text-green-500 mb-5">
                {code}: {thematic.thematic}
            </h3>
            <div className="bg-slate-800 lg:mx-40 mx-10 rounded-lg border-[1px]">
                {Array.isArray(exercise)? exercise.map((ex, i) => (
                    <Exercise 
                        key={i}
                        exercise={ex}/>
                )): <Exercise exercise={exercise}/>}
            </div>
        </div>
    )
}

export default ExOfThem;
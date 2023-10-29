
import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import { Exercise } from "../../components";

const ExOfThem = () => {
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER_URL + "exercises")
            .then(exercises => setExercises(exercises.data))
            .catch(err => console.log(err))
    }, []);

    const location = useLocation();
    const code = location.pathname.split('/')[2]
    const them = location.pathname.split('/')[3]
    const exercise = exercises.filter(f => f.subThematic === code);

    return(
        exercises && exercise &&
        <div className="text-white">
            <h3 className="text-center sm:text-2xl text-lg font-semibold text-green-500 mb-2">
                {code}: {them}
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
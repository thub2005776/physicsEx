import { useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ExView = ({ auth }) => {
    const [exercises, setExercises] = useState([]);
    const location = useLocation();
    const path = location.pathname.split('/')[4];
    // console.log(path);

    useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER_URL + "exercises")
            .then(res => setExercises(res.data))
            .catch(err => console.log(err))
    }, []);
    // console.log(exercises);

    const exercise = exercises ? exercises.filter((f) => f.subThematic === path) : [];

    const ExList = ({ ex }) => {
        return (
            <div className='p-3 m-1 hover:bg-slate-600 rounded-lg'>
                <Link to={`/admin/2/edit/${ex.no}`}>
                <div className="flex items-center ">
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium  truncate text-white">
                            {ex.no}
                        </p>
                        <p className="text-sm truncate text-gray-400">
                            {ex.question}
                        </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold  text-white">
                        $320
                    </div>
                </div>
            </Link>
            </div>
        )
    }
    return (
        auth && auth.permission === 'admin' && exercises &&
        <div className="lg:mx-32 mx-20">
            <div className='mt-3 text-green-500 lg:text-2xl text-lg text-center font-bold'>
                Bài tập của chuyên đề {path}
            </div>
            <div className="p-3">
                {Array.isArray(exercise) ?
                    exercise.map((ex, i) => (
                        <ExList
                            key={i}
                            ex={ex} />
                    )) : <ExList ex={exercise} />}
            </div>
        </div>
    )
}

export default ExView;
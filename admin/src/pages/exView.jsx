import { useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ExList } from '../components';


const ExView = ({ auth, exercises }) => {
    const location = useLocation();
    const path = location.pathname.split('/')[4];
    const exercise = exercises ? exercises.filter((f) => f.subThematic === path) : [];

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
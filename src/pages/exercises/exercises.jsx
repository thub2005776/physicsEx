import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import './exercises.css'

import Latex from 'react-latex';

function Exercises() {
    const [exercises, setExercises] = useState([]);
    const [active, setActive] = useState('12');
    useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER_URL + "exercises")
            .then(exercises => setExercises(exercises.data))
            .catch(err => console.log(err))
    }, []);

    const ex12 = exercises.filter(f => f.subThematic.includes('12'));
    const ex11 = exercises.filter(f => f.subThematic.includes('11'));
    const ex10 = exercises.filter(f => f.subThematic.includes('10'));

    function Exercise({ exercise }) {
        return (
            <div className='sm:mx-10 m-1 hover:bg-slate-700 rounded-lg'>
                <Link to={`/detail/` + exercise.no}>
                    <div className='p-5 rounded-md' id={exercise.subThematic}>
                        <div className='flex-none pr-3 '>
                            <p className='text-sm text-gray-500 '>{exercise.no}</p>
                        </div>
                        <div className='flex-1 pl-3 lg:text-lg  text-base text-white font-semibold text-ellipsis overflow-hidden'>
                            <Latex >{exercise.question}</Latex>
                        </div>
                    </div>
                </Link>
            </div>
        )
    }


    return (
        exercises && ex12 && ex11 && ex10 ? (
            <div className='sm:mx-20 mx-4 mt-3 border rounded-xl shadow  bg-gray-800 border-gray-700'>
                <div className='flex justify-evenly text-white font-bold sm:text-xl text-lg bg-gray-700 text-center rounded-t-xl'>
                    <div className='hover:bg-gray-600 w-full '
                        onClick={() => setActive('12')}>
                         <Link to={`#1201`} >
                        <p className={`py-6 ${active === '12'? "bg-gray-800 border-b-[1px]":null}`}>
                            Lớp 12
                        </p>
                    </Link>
                    </div>
                   
                    <div className='hover:bg-gray-600 w-full '
                        onClick={() => setActive('11')}>
                         <Link to={`#1201`} >
                        <p  className={`py-6 ${active === '11'? "bg-gray-800 border-b-[1px]":null}`}>
                            Lớp 11
                        </p>
                    </Link>
                    </div>
                    <div className='hover:bg-gray-600 w-full'
                        onClick={() => setActive('10')}>
                         <Link to={`#1201`} >
                        <p className={`py-6 ${active === '10'? "bg-gray-800 border-b-[1px]":null}`}>
                            Lớp 12
                        </p>
                    </Link>
                    </div>
                </div>
                <div className='pt-10 rounded-lg'>
                        {active === '12'? 
                            ex12.map((exercise, index) => (
                            <Exercise
                                key={index}
                                exercise={exercise}
                            />
                        )): active === '11'?
                        ex11.map((exercise, index) => (
                            <Exercise
                                key={index}
                                exercise={exercise}
                            />
                        )):
                        ex10.map((exercise, index) => (
                            <Exercise
                                key={index}
                                exercise={exercise}
                            />
                        ))}
                </div>
            </div>
        ) : <p className='text-white'>Đang tải dữ liệu...</p>

    )
}

export default Exercises;
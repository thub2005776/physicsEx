import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import ScrollSpy from "react-ui-scrollspy";
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


    function Exercise({ exercise }) {
        return (
            <div className='grid grid-cols-1 m-1 border-b-white'>
                <Link to={`/detail/` + exercise.no}>
                    <div className='p-5 flex w-auto rounded-md' id={exercise.subThematic}>
                        <div className='flex-none pr-3 border-r-4 '>
                            <p className='text-xl text-[#deeef5] hover:text-teal-500'>{exercise.subThematic}</p>
                        </div>
                        <div className='flex-1 pl-3 text-xl text-white  hover:text-teal-500 font-semibold text-ellipsis overflow-hidden'>
                            <Latex >{exercise.question}</Latex>
                        </div>
                    </div>
                </Link>
            </div>
        )
    }


    return (
        exercises.length ? (
            <div className='sm:mx-20 mx-4 mt-3 border rounded-xl shadow  bg-gray-800 border-gray-700'>
                <div className='flex justify-evenly text-white font-bold sm:text-xl text-lg bg-gray-700 text-center rounded-t-xl'>
                    <div className='hover:bg-gray-600 w-full '
                        onClick={() => setActive('12')}>
                         <Link to={`#1201`} >
                        <p data-to-scrollspy-id="1201" className={`py-6 ${active === '12'? "bg-gray-800 border-b-[1px]":null}`}>Lớp 12</p>
                    </Link>
                    </div>
                   
                    <div className='hover:bg-gray-600 w-full '
                        onClick={() => setActive('11')}>
                         <Link to={`#1201`} >
                        <p data-to-scrollspy-id="1201" className={`py-6 ${active === '11'? "bg-gray-800 border-b-[1px]":null}`}>Lớp 11</p>
                    </Link>
                    </div>
                    <div className='hover:bg-gray-600 w-full'
                        onClick={() => setActive('10')}>
                         <Link to={`#1201`} >
                        <p data-to-scrollspy-id="1201" className={`py-6 ${active === '10'? "bg-gray-800 border-b-[1px]":null}`}>Lớp 12</p>
                    </Link>
                    </div>
                </div>
                <div className='pt-10 rounded-lg'>
                    <ScrollSpy
                     scrollThrottle={100} useBoxMethod={false}>
                        {exercises.map((exercise, index) => (
                            <Exercise
                                key={index}
                                exercise={exercise}
                            />
                        ))}
                    </ScrollSpy>
                    
                </div>
            </div>
        ) : <p className='text-white'>Loading...</p>

    )
}

export default Exercises;
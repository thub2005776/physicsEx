import React from 'react'
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";
import { BiCopy } from "react-icons/bi";

function Exercises() {
    const [exercises, setExercises] = useState([]);
    const [thematics, setThematics] = useState([]);

    useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER_URL + "exercises")
            .then(exercises => setExercises(exercises.data))
            .catch(err => console.log(err))
    }, []);

    useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER_URL + "thematics")
            .then(thematics => setThematics(thematics.data))
            .catch(err => console.log(err))
    }, [])

    function ThematicName({ thematic, grade }) {

        return (thematic.code.substring(0, 2) === grade &&
                <a href={`#`+thematic.code} >
                    <p className='p-3 text-[#1cc8bc] hover:text-green-500 pl-2 sm:text-sm selection:text-blue-600'>
                        {thematic.thematic}
                    </p>
                </a>
        )

    }

    function Exercise({ exercise }) {
        return (
            <div className='grid grid-cols-1 my-2 rounded-lg  outline hover:outline-4 outline-[#1cc8bc]'>
                <Link to={`/exercise/detail/` + exercise.subThematic}>
                    <div className='p-5 flex' id={exercise.subThematic}>
                        <div className='flex-none pr-3'>
                            <p className='text-3xl text-[#6ec3e8]'>{exercise.subThematic} |</p>
                        </div>
                        <div className='flex-1'>
                            <p className='text-lg text-[#1cc8bc] line-clamp-2'>{exercise.question}</p>
                        </div>
                    </div>
                </Link>
                <div className='container bg-slate-700'>
                    <div className='text-white text-lg flex justify-between'>
                        <div className='flex-2 p-4'>
                            <p className='font-semibold'>Đáp án</p>
                        <p>{exercise.answer}
                        </p>
                        </div>
                        <div className='flex-none p-3'>
                            <BiCopy/>
                        </div>
                        
                    </div>
                    
                </div>
            </div>
        )
    }


    return (
        exercises?.length && thematics?.length && (
            <div className='grid grid-cols-5 px-2'>
                <div className='pl-8 bg-zinc-900 rounded-md'>
                    <a href={`#1201`}>
                        <p className='py-6 text-xl text-[#6ec3e8] hover:text-cyan-200'>Lớp 12</p>
                    </a>
                    
                    {thematics.map((thematic, index) => (
                        <ThematicName
                            key={index}
                            thematic={thematic}
                            grade={"12"}
                        />
                    ))}
                    <a href='#1101'>
                        <p className='py-6 text-xl text-[#6ec3e8] hover:text-cyan-200'>Lớp 11</p>
                    </a>
                    
                    {thematics.map((thematic, index) => (
                        <ThematicName
                            key={index}
                            thematic={thematic}
                            grade={"11"}
                        />
                    ))}
                    <a href='#1001'>
                        <p className='py-6 text-xl text-[#6ec3e8] hover:text-cyan-200'>Lớp 11</p>
                    </a>
                    
                    {thematics.map((thematic, index) => (
                        <ThematicName
                            key={index}
                            thematic={thematic}
                            grade={"10"}
                        />
                    ))}
                </div>
                <div className='col-span-4'>
                    <div className='container mx-auto px-10 py-5'>
                        {exercises.map((exercise, index) => (
                            <Exercise
                                key={index}
                                exercise={exercise}
                            />
                        ))}
                    </div>
                </div>
            </div>
        )

    )
}

export default Exercises;
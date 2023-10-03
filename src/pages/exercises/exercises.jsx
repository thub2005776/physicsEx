import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";

import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

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
            <a href={`#` + thematic.code} >
                <p className='p-3 text-[#1cc8bc] hover:text-green-500 pl-2 sm:text-sm selection:text-blue-600'>
                    {thematic.thematic}
                </p>
            </a>
        )

    }

    // Exercises part 



    function Exercise({ exercise }) {
        return (
            <div className='grid grid-cols-1  rounded-lg '>
                <div className='p-5 flex bg-slate-600 hover:bg-slate-700 rounded-md' id={exercise.subThematic}>
                    <div className='flex-none pr-3 border-r-4 '>
                        <p className='text-3xl text-[#deeef5]'>{exercise.subThematic}</p>
                    </div>
                    <div className='flex-1 pl-3 text-xl text-white font-semibold'>
                        <BlockMath  math={exercise.question}/>
                    </div>
                </div>

                <div className=' bg-zinc-800 ml-2 text-white text-lg  font-semibold'>
                   
                            <p className='pl-3'>Đáp án:</p>
                            <div className='block align-text-top'>
                                <BlockMath math={exercise.answer} />
                            </div>

                            <p className=''>Hướng dẫn:</p>
                            <div>
                                <BlockMath math={exercise.content} />
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
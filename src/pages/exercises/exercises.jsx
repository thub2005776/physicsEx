import React from 'react'
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";

function Exercises() {
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER_URL + "exercises")
            .then(exercises => setExercises(exercises.data))
            .catch(err => console.log(err))
    }, []);

    return (
        exercises?.length && (
            <div className='grid grid-cols-5 px-2 '>
                <div className='pl-8 bg-zinc-900 rounded-md'>
                    <p className='text-xl text-[#6ec3e8] hover:text-cyan-300'>Lớp 12</p>
                    <p className='text-[#1cc8bc] hover:text-green-500 pl-2'>Dao động</p>
                    <p className='text-[#1cc8bc] pl-2'>Dao động</p>
                    <p className='text-[#1cc8bc] pl-2'>Dao động</p>
                    <p className='text-xl text-[#6ec3e8]'>Lớp 11</p>
                </div>
                <div className='col-span-4'>
                    <div className='container mx-auto px-10 py-1'>
                    <div className='grid grid-cols-1 rounded-lg  outline hover:outline-4 outline-[#1cc8bc]'>
                        <Link to={`/exercise/detail`}>
                            <div className='p-5 flex'>
                                <div className='flex-none pr-3'>
                                    <p className='text-3xl text-[#6ec3e8]'>{exercises[0].subThematic} |</p>
                                </div>
                                <div className='flex-1'>
                                    <p className='text-lg text-[#1cc8bc] line-clamp-2'>{exercises[0].question}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>

                <div className='container mx-auto px-36 py-1'>
                    <div className='grid grid-cols-1 rounded-lg border-green-500 outline hover:outline-4 outline-primaryColor'>
                        <Link to={`/exercise/detail`}>
                            <div className='p-5 flex'>
                                <div className='flex-none pr-3'>
                                    <p className='text-3xl text-primaryColor2'>{exercises[0].subThematic} |</p>
                                </div>
                                <div className='flex-1'>
                                    <p className='text-lg text-primaryColor line-clamp-2'>{exercises[0].question}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>

                </div>
            </div>
        )

    )
}

export default Exercises;
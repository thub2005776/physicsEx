import React from 'react'
import { useState} from "react";
import { Exercise } from '../../components';

function Exercises({exercises}) {
    const [active, setActive] = useState('12');
    const ex12 = exercises && exercises.filter(f => f.subThematic !== undefined && f.subThematic.includes('120'));
    const ex11 = exercises && exercises.filter(f => f.subThematic !== undefined && f.subThematic.includes('110'));
    const ex10 = exercises && exercises.filter(f => f.subThematic !== undefined && f.subThematic.includes('100'));

    return (
        exercises && ex12 && ex11 && ex10 &&
            <div className='sm:mx-20 mx-4 mt-24 border rounded-xl shadow  bg-gray-800 border-gray-700'>
                <div className='flex justify-evenly text-white font-bold sm:text-xl text-lg bg-gray-700 text-center rounded-t-xl'>
                    <div className='hover:bg-gray-600 w-full '
                        onClick={() => setActive('12')}>
                            <p className={`py-6 ${active === '12' ? "bg-gray-800 border-b-[1px]" : null}`}>
                                Lớp 12
                            </p>
                    </div>

                    <div className='hover:bg-gray-600 w-full '
                        onClick={() => setActive('11')}>
                            <p className={`py-6 ${active === '11' ? "bg-gray-800 border-b-[1px]" : null}`}>
                                Lớp 11
                            </p>
                    </div>
                    <div className='hover:bg-gray-600 w-full'
                        onClick={() => setActive('10')}>
                            <p className={`py-6 ${active === '10' ? "bg-gray-800 border-b-[1px]" : null}`}>
                                Lớp 10
                            </p>
                    </div>
                </div>
                <div className='pt-10 rounded-lg'>
                    {active === '12' ?
                        ex12.map((exercise, index) => (
                            <Exercise
                                key={index}
                                exercise={exercise}
                            />
                        )) : active === '11' ?
                            ex11.map((exercise, index) => (
                                <Exercise
                                    key={index}
                                    exercise={exercise}
                                />
                            )) :
                            ex10.map((exercise, index) => (
                                <Exercise
                                    key={index}
                                    exercise={exercise}
                                />
                            ))}
                </div>
            </div>

    )
}

export default Exercises;
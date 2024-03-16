import React from 'react'
import { useState } from "react";
import { useLocation } from 'react-router';
import Latex from 'react-latex';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { AiOutlineCopy } from "react-icons/ai";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { LikeStatus, CommentDisplay } from '../../components'
import { useNavigate } from 'react-router-dom';

function Detail({ auth, user, exercises, com }) {
    const [answerState, setAnswerState] = useState(false);
    const [contentState, setContentState] = useState(false);

    const location = useLocation();
    const id = location.pathname.split('/')[2]
    const exercise = exercises.find((p) => p._id === id);
    const navigate = useNavigate();

    return (
        exercise && 
        (<div className=' text-white m-5 mt-20'>
                <div className='flex justify-evenly'>
                    <div className=' text-green-600 float-left hover:text-green-400'
                        onClick={() => navigate(-1)}>
                        <BsArrowLeftCircleFill size={30} />Trở lại
                    </div>
                    <h1 className='lg:text-2xl text-lg font-bold text-center mb-10  text-green-400'>Chi tiết bài tập</h1>
                    <LikeStatus exercise={exercise} />
                </div>

                <div className='sm:text-lg text-base sm:mx-10 mx-2'>
                    <p className=' text-cyan-500 font-bold'>Đề bài:</p>
                    <div className='sm:flex lg:justify-between ml-10 bg-gray-800 rounded-lg'>
                        <div className='m-5 font-medium '>
                            <Latex>{exercise.question}</Latex>
                        </div>
                        <img className='sm:w-72 w-full rounded-lg' src={process.env.REACT_APP_SERVER_URL + exercise.img} alt={exercise.no} />
                    </div>
                    <div className='mt-1 flex justify-center'>

                        <span className="flex w-3 h-3 me-3 bg-gray-200 rounded-full"></span>
                        <span className="flex w-3 h-3 me-3 bg-blue-600 rounded-full"></span>
                        <span className="flex w-3 h-3 me-3 bg-green-500 rounded-full"></span>
                        <span className="flex w-3 h-3 me-3 bg-purple-500 rounded-full"></span>
                        <span className="flex w-3 h-3 me-3 bg-teal-500 rounded-full"></span>

                    </div>
                    <div className='lg:flex mt-5 text-white font-sans text-base sm:text-lg '>
                        <div className='flex-none lg:w-2/5 w-full '>
                            <button className='font-bold p-2 w-full rounded-l-md'>
                                Đáp án
                            </button>
                            <CopyToClipboard
                                text={exercise.answer.replaceAll('$', '')}
                                onCopy={() => setAnswerState(true)}
                            >
                                <div className='bg-gray-900 p-5 h-full mr-1 rounded-md border border-gray-600'>
                                    <button className='float-right text-teal-500  p-1 ps-3 hover:text-white'>
                                        <AiOutlineCopy />
                                    </button>
                                    {answerState ? <p className='text-xs text-green-400 float-right pt-2'>Đã sao chép!</p> : null}
                                    <div className='ps-4 mt-3'><Latex>{exercise.answer}</Latex></div>

                                </div>
                            </CopyToClipboard>

                        </div>
                        <div className='flex-1 lg:w-3/5 w-full'>
                            <button className='font-bold p-2 rounded-r-md w-full'>
                                Hướng dẫn
                            </button>
                            <CopyToClipboard
                                text={exercise.content.replaceAll('$', '')}
                                onCopy={() => setContentState(true)}
                            >
                                <div className='bg-gray-900 rounded-md h-full border border-gray-600'>
                                    <button className='float-right p-2 text-teal-500 hover:text-white'
                                    >
                                        <AiOutlineCopy />
                                    </button>
                                    {contentState ? <p className='text-xs text-green-400 float-right pt-6'>Đã sao chép!</p> : null}
                                    <div className='p-5'><Latex>{exercise.content}</Latex></div>
                                </div>
                            </CopyToClipboard>
                        </div>
                    </div>
                    <CommentDisplay auth={auth} comm={com} user={user} id={id} />
                </div>
            </div>
        )
    )
}

export default Detail;
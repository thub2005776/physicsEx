import React from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { EditProfile } from '../../components';

const Profile = ({ auth, users, com }) => {
    const [edit, setEdit] = useState(false);

    const location = useLocation();
    const id = location.pathname.split('/')[4];
    const user = users?.find(f => f._id === id);
    const comments = com && auth && com.filter(f => f.uid === id);

    const Comment = ({ comment }) => {
        return (
            <div className='block p-1 w-full text-sm   
            placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'>
                <b>{comment.time.toString().slice(0, 10)}</b>: {comment.content}
            </div>
        )
    }


    const Item = ({ data, name }) => {
        return (
            <Link
                to={name === 'courses' ? `/courses/${data.cid}`
                    : `/tests/${data.tid}`}>
                <div className='p-1 m-2 bg-gray-600 rounded-lg text-white'>
                    {data.name}
                    <p className='text-gray-400'>
                        <time>
                            {data.time.slice(0, 10)}
                        </time>
                    </p>

                </div>
            </Link>
        )
    }
    return (
        auth && user &&
        (<div className='mt-5'>
            <div className='sm:text-2xl text-lg sm:font-bold text-green-600 text-center mb-6'>
                Thông tin tài khoản
            </div>
            <div className="mx-5 p-6  border  rounded-lg shadow  bg-gray-800 border-gray-700  md:flex block relative">
                <div className={`absolute top-1 right-1 text-white cursor-pointer hover:bg-slate-900 p-1  rounded-md ${edit ? "bg-slate-900" : "bg-slate-500"}`}
                    onClick={() => setEdit(!edit)}>
                    <svg className="w-6 h-6 text-white"
                        aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                        <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm-1.391 7.361.707-3.535a3 3 0 0 1 .82-1.533L7.929 
                                    10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h4.259a2.975 2.975 0 0 1-.15-1.639ZM8.05 17.95a1 1 0 0 
                                    1-.981-1.2l.708-3.536a1 1 0 0 1 .274-.511l6.363-6.364a3.007 3.007 0 0 1 4.243 0 3.007 3.007 0 0 
                                    1 0 4.243l-6.365 6.363a1 1 0 0 1-.511.274l-3.536.708a1.07 1.07 0 0 1-.195.023Z" />
                    </svg>
                </div>

                {!edit ?
                    <div className='sm:flex justify-around gap-5 w-full p-4'>
                        <div>
                            <img
                                src={process.env.REACT_APP_SERVER_URL + user?.img} alt={user?.name}
                                className={`mx-auto bg-slate-600 p-2 h-40  sm:ml-0  w-40 rounded-full cursor-pointer`}
                            />
                            <div className='text-center'>
                                <div className='mb-2'>
                                    <p className="font-normal text-gray-400">Tên tài khoản</p>
                                    <h5 className="mb-2 sm:text-xl text-md font-bold text-white">{user?.name}</h5>
                                </div>
                                <div className='mb-6'>
                                    <p className="sm:font-normal text-gray-400">
                                        Địa chỉ Email
                                    </p>
                                    <h5 className="mb-2 sm:text-xl text-md font-bold text-white">
                                        {user?.email}
                                    </h5>
                                </div>
                            </div>
                        </div>
                        {/* comments  */}
                        <div className='mb-6 w-full'>
                            <p className="sm:font-normal text-gray-400">
                                Bình luận của bạn ({comments && comments.length > 0?  comments.length: '0'})
                            </p>
                            <div className='rounded-lg border bg-gray-700 border-gray-600'>
                                {comments?.slice(0,5).map((com, i) => (
                                    <Comment key={i} comment={com} />
                                ))}
                            </div>
                        </div>

                        {/* courses  */}
                        <div className='w-full mb-6'>
                            <h1 className='text-gray-400 '>
                                Các khóa học ({user.courses ? user.courses?.length : '0'})
                            </h1>
                            { user.courses?.slice(0,3).map((c, i) => (
                                <Item key={i} data={c} name={'courses'} />
                            ))}
                        </div>

                        {/* tests  */}
                        <div className='w-full mb-6'>
                            <h1 className='text-gray-400'>
                                Các bài kiểm tra ({user.tests ? user.tests?.length : '0'})
                            </h1>
                            { user.tests?.slice(0,3).map((t, i) => (
                                <Item key={i} data={t} name={'tests'} />
                            ))}
                        </div>
                    </div>
                    : <EditProfile auth={user} />}
            </div>
        </div>
        )
    )
};

export default Profile;

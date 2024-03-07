
import { AiFillDelete, AiOutlineEdit, AiOutlinePlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
import Delete from './delete';

const ListItem = ({ name, data }) => {
    const [del, setDel] = useState(false);

    const handleDelete = (e) => {
        setDel(!e);
        if (e) {
            if (name === 'users') {
                const id = data._id;
                axios.delete(process.env.REACT_APP_SERVER_URL + `users/${id}`)
                    .then(res => {
                        alert("Đã xóa!");
                        window.location.reload();
                    })
                    .catch(err => console.log(err))
                axios.delete(process.env.REACT_APP_SERVER_URL + `comments/${id}`)
                    .then(res => console.log(res.data))
                    .catch(err => console.log(err))

            } else if (name === 'them') {
                axios.delete(process.env.REACT_APP_SERVER_URL + `exercises/${data._id}`)
                    .then(res => {
                        if (res.status === 200) {
                            console.log('deleted');
                        }
                    })
                    .catch(err => console.log(err))

                axios.delete(process.env.REACT_APP_SERVER_URL + `thematics/${data._id}`)
                    .then(res => {
                        if (res.status === 200) {
                            alert("Đã xóa!");
                            window.location.reload();
                        }
                    })
                    .catch(err => console.log(err))

            } else {
                axios.delete(process.env.REACT_APP_SERVER_URL + `docs/${data._id}`)
                    .then(res => {
                        if (res.status === 200) {
                            alert("Đã xóa!");
                            window.location.reload();
                        }

                    })
                    .catch(err => console.log(err))
            }
        }

    }

    const handleExit = (e) => {
        setDel(!e);
    }

    return (
        data &&
        <div className={`relative flex justify-between border-b-0 my-2 rounded-md hover:bg-slate-500 sm:text-base text-sx`}>
            <Link to={`view/${data._id}`}
                className="flex-1 grid grid-cols-4 gap-5">
                {name === 'them' ?
                    (<>
                        <img className='w-[20px] h-[20px] lg:w-[40px] lg:h-[40px] rounded-full mx-5'
                            src={process.env.REACT_APP_SERVER_URL + data.img}
                            alt={data.code} />
                        <div className="">{data.code}</div>
                        <div className="truncate">{data.thematic}</div>
                    </>
                    ) : name === 'users' ?
                        (<>
                            <img className='w-[20px] h-[20px] lg:w-[40px] lg:h-[40px] rounded-full mx-5'
                                src={process.env.REACT_APP_SERVER_URL + data.img}
                                alt={data.name} />
                            <div className="">{data.name}</div>

                            <div className="truncate">{data.email}</div>
                            <div className="">{data.permission}</div>
                        </>
                        )
                        : <>
                            <div className="ml-5">{data.grade}</div>
                            <div className=" truncate">{data.name}</div>
                        </>}
            </Link>

            <div className='flex justify-end mr-5'>
                {name === 'them' &&
                    <>
                        <Link to={data._id}
                            className='p-2 hover:bg-slate-600 rounded-lg '>
                            <AiOutlinePlusCircle />
                        </Link >
                        <Link to={`edit/${data._id}`}
                            className='p-2 hover:bg-slate-600 rounded-lg'>
                            <AiOutlineEdit />
                        </Link>
                    </>
                }


                <div className=' p-2 hover:bg-slate-600 rounded-lg'
                    onClick={() => setDel(!del)}>
                    <AiFillDelete />
                </div>

            </div>
            {del &&
                <div className="absolute -top-32 right-44 z-[100]">
                    <Delete sendDelete={handleDelete} Exit={handleExit} />
                </div>}
        </div>

    )

}

export default ListItem;
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Delete } from '.';
import axios from 'axios';

const CardItem = ({ data, name }) => {
    const [del, setDel] = useState(false);
    const navigate = useNavigate();

    const handleDelete = (e) => {
        setDel(!e);
        if (e) {
            if(name === 'course') {
                axios.delete(process.env.REACT_APP_SERVER_URL + `courses/${data && data._id}`)
                .then(res => {
                    alert("Đã xóa!");
                    navigate(0, { replace: true });
                })
                .catch(err => console.log(err))
            } else {
                axios.delete(process.env.REACT_APP_SERVER_URL + `tests/${data && data._id}`)
                .then(res => {
                    alert("Đã xóa!");
                    navigate(0, { replace: true });
                })
                .catch(err => console.log(err))
            }
            

            axios.delete(process.env.REACT_APP_SERVER_URL + `file/remove/${data && data.img}`)
                .then(res => { console.log(res.data) })
                .catch(err => console.log(err))
        }
    }

    const handleExit = (e) => {
        setDel(!e);
    }
    return (
        data &&
        <div className='flex justify-between'>
            {del &&
                <div className="absolute top-0 lg:left-[35%] md:left-[30%] left-[10%] z-[500]">
                    <Delete sendDelete={handleDelete} Exit={handleExit} />
                </div>}
            <Link className='flex-1' to={`/admin/${name === 'course'? 4:5}/${data._id}`}>
                <div className="py-1 sm:py-4 hover:border-b-[0.5px]">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <img className="w-8 h-8 rounded-full" src={process.env.REACT_APP_SERVER_URL + data.img} alt={data.name} />
                        </div>
                        <div className="flex-1 min-w-0 ms-4">
                            <p className="text-sm font-medium  truncate text-white">
                                {data.name}
                            </p>
                            <p className="text-sm truncate text-gray-400">
                                view
                            </p>
                        </div>
                        <div className="inline-flex items-center">
                            <p className={`text-xs font-medium me-2 px-2.5 py-0.5 rounded 
                        ${data.level === 'easy' ? 'bg-green-900 text-green-300' :
                                    data.level === 'medium' ? 'bg-blue-900 text-blue-300' :
                                        data.level === 'hard' ? 'bg-yellow-900 text-yellow-300' :
                                            'bg-pink-900 text-pink-300'}`}>
                                {data.level}
                            </p>

                        </div>
                    </div>
                </div>
            </Link>
            <div className='w-8 h-8 p-1 mt-5 inline-flex items-center border border-gray-600 hover:bg-slate-600 rounded-lg'
                onClick={() => setDel(!del)}>
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M8.6 2.6A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4c0-.5.2-1 .6-1.4ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clipRule="evenodd" />
                </svg>
            </div>
        </div>


    )
}

export default CardItem;
import { AiFillDelete, AiFillLike, AiFillDislike } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { Delete } from '../../components'
import { useState } from "react";
import axios from "axios";

const ExList = ({ ex }) => {
    const [del, setDel] = useState(false);

    const handleDelete = (e) => {
        if(e) {
            const no = ex.no;
            const img = ex.img;
            axios.post(process.env.REACT_APP_SERVER_URL + "del/ex", { no, img })
                .then(res => {
                    alert("Đã xóa!");
                    window.location.reload(true);
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <div className='relative p-3 m-1 hover:bg-slate-600 rounded-lg'>
            <div className="flex items-center ">
                <Link to={`/admin/2/edit/${ex.no}`} className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate text-white">
                        {ex.no}
                    </p>
                    <p className="text-sm truncate text-gray-400">
                        {ex.question}
                    </p>
                </Link>
                <div className="inline-flex items-center text-white hover:bg-slate-700 p-2 rounded-md">
                    <AiFillLike />
                    <span className='text-sm font-semibold text-slate-400'>{ex.like}</span>
                </div>
                <div className="inline-flex items-center text-white ml-3 hover:bg-slate-700 p-2 rounded-md">
                    <AiFillDislike />
                    <span className='text-sm font-semibold text-slate-400'>{ex.dislike}</span>
                </div>
                <div className="ml-4 inline-flex items-center  text-white hover:bg-slate-700 p-2 rounded-md"
                    onClick={() => setDel(!del)}>
                    <AiFillDelete />
                </div>
            </div>
            {del && 
            <div className="absolute -top-10 right-80 z-[100]">
                <Delete sendDelete={handleDelete}/>
            </div>}
        </div>
    )
}

export default ExList;
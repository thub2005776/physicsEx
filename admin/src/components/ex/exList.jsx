import { AiFillDelete, AiFillLike, AiFillDislike } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { Delete } from '..'
import { useState } from "react";
import axios from "axios";

const ExList = ({ ex }) => {
    const [del, setDel] = useState(false);

    const handleDelete = (e) => {
        if (e) {
            const id = ex._id;
            axios.delete(process.env.REACT_APP_SERVER_URL + `exercises/${id}`)
                .then(res => {
                    alert("Đã xóa!");
                    window.location.reload();
                })
                .catch(err => console.log(err))
        }
    }

    return (
        ex &&
        <div className='p-3 m-1 hover:bg-slate-600 border-b-[1px] border-gray-600 rounded-lg'>
            <div className="flex items-center ">
                <Link to={`/admin/2/ex/${ex._id}`} className="flex-1 min-w-0">
                    <div className="flex gap-4">
                        <img className=" w-14 h-14 rounded-full border border-gray-400 p-1" src={process.env.REACT_APP_SERVER_URL + ex.img} alt={ex.no} />
                        <p className="text-sm font-medium  text-white">
                            {ex.no}
                        </p>
                    </div>


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
                <div className="absolute top-0 right-52 z-[100]">
                    <Delete sendDelete={handleDelete} />
                </div>}
        </div>
    )
}

export default ExList;
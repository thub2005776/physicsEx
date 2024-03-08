import { useState } from 'react';
import { Link } from 'react-router-dom'
import { Reply, Delete } from '..';
import axios from 'axios';

const CommItem = ({ auth, com }) => {
    const [rep, setRep] = useState(false);
    const [del, setDel] = useState(false);

    const handleClosed = (e) => {
        setRep(!e);
    }

    const handleDelete = (e) => {
        setDel(!e);
        if (e) {
            axios.delete(process.env.REACT_APP_SERVER_URL + `comments/${com._id}`)
                .then(res => {
                    if(res.status === 200) {
                        alert("Đã xóa!");
                    window.location.reload();
                    }
                })
                .catch(err => console.log(err))
        }
    }

    const handleExit = (e) => {
        setDel(!e);
    }
    return (
        com &&
        <div className="flex justify-between py-3 sm:py-4 hover:bg-slate-500 cursor-pointer rounded-md px-2">
            <div className="flex items-center">
                <div className="flex-shrink-0">
                    <img className="w-8 h-8 rounded-full" src={process.env.REACT_APP_SERVER_URL + 'comment.jpg'} alt='comment' />
                </div>
                <div className="flex-1 min-w-0 ms-4">
                    <p className="text-sm font-medium  truncate text-white">
                        {com.content}
                    </p>
                    <p className="text-sm  truncate text-gray-400">
                        {com && com.time.toString().slice(0, 10)}
                    </p>
                </div>
            </div>
            {/* Reply and delete button  */}
            <div className="inline-flex gap-2 items-center text-base font-semibold  text-white">
                {com && com.state === false ?
                    <div className=" text-xs font-medium me-2 px-2.5 py-0.5 rounded bg-yellow-900 text-yellow-300">Chưa phản hồi</div>
                    : <div className=" text-xs font-medium me-2 px-2.5 py-0.5 rounded bg-green-900 text-green-300">Đã phản hồi</div>
                }

                <div className='p-2 border border-gray-600 hover:bg-slate-600 rounded-lg'
                    onClick={() => setRep(!rep)}>
                    <svg className="w-4 h-4 text-white " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 19 16">
                        <path d="M12.5 3.046H10v-.928A2.12 2.12 0 0 0 8.8.164a1.828 1.828 0 0 0-1.985.311l-5.109 4.49a2.2 2.2 0 0 0 0 3.24L6.815 12.7a1.83 1.83 0 0 0 1.986.31A2.122 2.122 0 0 0 10 11.051v-.928h1a2.026 2.026 0 0 1 2 2.047V15a.999.999 0 0 0 1.276.961A6.593 6.593 0 0 0 12.5 3.046Z" />
                    </svg>
                </div>
                <div className='absolute top-14 left-40  z-[500] w-full'>
                    {rep && <Reply auth={auth} comm={com} closed={handleClosed} />}
                </div>

                <div className='p-2 border border-gray-600 hover:bg-slate-600 rounded-lg'
                    onClick={() => setDel(!del)}>
                    <svg className="w-4 h-4  text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                        <path d="M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z" />
                    </svg>
                </div>
                {del &&
                    <div className="absolute -top-10 right-80 z-[100]">
                        <Delete sendDelete={handleDelete} Exit={handleExit} />
                    </div>}
                <Link to={`/admin/2/ex/${com.eid}`}>
                    <div className='p-2 border border-gray-600 hover:bg-slate-600 rounded-lg'>
                        <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                            <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2Zm-3 15H4.828a1 1 0 0 1 0-2h6.238a1 1 0 0 1 0 2Zm0-4H4.828a1 1 0 0 1 0-2h6.238a1 1 0 1 1 0 2Z" />
                            <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                        </svg>
                    </div>
                </Link>
            </div>
        </div>

    )
}

export default CommItem;
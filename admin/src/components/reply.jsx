import { useState } from "react";
import axios from 'axios';

const Reply = ({ auth, comm, closed }) => {
    const [close, setClose] = useState(false);
    const [content, setContent] = useState();
    
    const HandleClosed = () => {
        setClose(true);
        closed(true);
    }

    const handSubmit = (e) => {
        e.preventDefault();
        if (content === null) {
            alert('Bạn chưa nhập nội dung bình luận!');
        } else {
            let uid = auth.uid;
            let uimg = auth.img;
            let id = comm._id;
            let eid = comm.eid;
            let com = content;
            let rep = true;

            axios.post(process.env.REACT_APP_SERVER_URL + `comments/${comm._id}`, { id, eid, uid, uimg, com, rep })
                .then(() => {
                    alert('Đã trả lời bình luận!');
                    setClose(true);
                    closed(true);
                    document.location.reload();
                })
                .catch(err => console.log(err))

            axios.post(process.env.REACT_APP_SERVER_URL + 'comments/update', { id })
                .then(res => { console.log('') })
                .catch(err => console.log(err))

            axios.post(process.env.REACT_APP_SERVER_URL + 'users/'+ uid, { uid, eid, com })
                .then(res => { console.log('') })
                .catch(err => console.log(err));
        }

    }

    return (
        !close &&
        <div id="crud-modal" tabIndex="-1" aria-hidden="true" className="justify-center items-center w-full  h-[calc(100%-1rem)] max-h-full">
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative  rounded-lg shadow bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600">
                        <h3 className="text-lg font-semiboldtext-white">
                            Trả lời bình luận
                        </h3>

                        <button type="button" className="text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white" data-modal-toggle="crud-modal"
                            onClick={HandleClosed}>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>

                    <form onSubmit={handSubmit} className="p-4 md:p-5">
                        <div className="grid gap-4 mb-4 grid-cols-2">
                            <div className="col-span-2">
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-white">Bình luận</label>
                                <textarea id="description" rows="4" className="block p-2.5 w-full text-sm  rounded-lg border  bg-gray-600  border-gray-500  placeholder-gray-400  text-white  focus:ring-blue-500  focus:border-blue-500" placeholder="Viết bình luận tại đây"
                                    onChange={(e) => setContent(e.target.value)}></textarea>
                            </div>
                        </div>
                        <button type="submit" className="text-white inline-flex items-center focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600  hover:bg-blue-700  focus:ring-blue-800">
                            Gửi
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Reply;
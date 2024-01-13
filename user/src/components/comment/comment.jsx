import axios from "axios";
import { useState } from "react";

const Comment = ({ id, eid, user, sended, reply }) => {
    const [com, setCom] = useState();
    const [rep, setRep] = useState(reply);
    const HandleChange = (e) => {
        if (!user) {
            alert('Bạn chưa đăng nhập!');
        }
        setCom(e.target.value);
    }

    const HandleSubmit = (e) => {
        e.preventDefault();
        if (reply === null) {
            setRep(false);
        }
        const uid = user.uid;
        const uimg = user.img;
        axios.post(process.env.REACT_APP_SERVER_URL + 'add/comm', { id, eid, uid, uimg, com, rep })
            .then(() => {
                sended(true);
            })
            .catch(err => console.log(err))
        
        let state = false;
        axios.post(process.env.REACT_APP_SERVER_URL + 'add/userComm', { uid, eid, com, state})
            .then(res => {console.log('');})
            .catch(err => console.log(err));
    }
    return (
        <div className="mx-10">
            <label htmlFor="message" className="block m-2  text-sm font-medium  text-white">
                Bình luận của bạn
            </label>
            <form onSubmit={HandleSubmit}>
                <label htmlFor="chat" className="sr-only">Your message</label>
                <div className="flex items-center px-3 py-2 rounded-lg  bg-gray-700">
                    {user && <img src={process.env.REACT_APP_SERVER_URL + user.img} alt={user.name} className="w-8 h-8 rounded-full" />}
                    <textarea id="chat" rows="1"
                        className="block mx-4 p-2.5 w-full text-sm rounded-lg border bg-gray-800 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Viết bình luận tại đây..."
                        onChange={HandleChange}>
                    </textarea>
                    <button type="submit"
                        className="inline-flex justify-center p-2 rounded-full cursor-pointer  text-blue-500 hover:bg-gray-600">
                        <svg className="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                            <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Comment;
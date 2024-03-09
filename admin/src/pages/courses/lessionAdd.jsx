import { useState } from "react";
import axios from 'axios';
import { useLocation } from 'react-router';
import { useNavigate } from "react-router-dom";
import courseImg from '../../assets/course.jpg';

const LessionAdd = ({ auth }) => {
    const [name, setName] = useState(null);
    const [link, setLink] = useState(null);
    const [duration, setDuration] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const cid = location.pathname.split('/')[4];

    const handleSubmit = (e) => {
        e.preventDefault();
        const values = {
            "cid": cid,
            "name": name,
            "link": link,
            "duration": duration,
            "view": 0
        }

        axios.post(process.env.REACT_APP_SERVER_URL + "lessions", values)
            .then(res => {
                if (res.status === 200) {
                    alert("Thêm thành công!");
                    navigate(0, { replace: true })
                }
            })
            .catch(err => console.log(err))

    }

    return (
        auth && auth.permission === "admin" &&
        <div className="pt-10">
            <div className="sm:text-2xl text-lg text-teal-400 sm:font-bold font-semibold mb-6 text-center">
                Thông tin bài học mới
            </div>
            <div className="md:flex justify-center gap-4 mx-4">
                <div className="w-[420px] md:mb-0 mb-6 p-4 bg-gray-800 border border-gray-600 rounded-md">
            {link ? <iframe width={390} height={290} src={`https://www.youtube.com/embed/${link}`}></iframe>
            :<img className="w-[390px] h-[290px]" src={courseImg} alt="review video" />}
            <p className="text-gray-400 text-center text-base">Video xem trước</p>
            </div>
            <form className="md:w-fit flex-grow shadow bg-gray-900 rounded-lg p-3" onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-slate-400 ">
                        Chủ đề bài học
                    </label>
                    <input
                        id="name"
                        required
                        className="bg-slate-700 border  text-white text-sm rounded-lg
                            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "

                        onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="link"
                        className="block mb-2 text-sm font-medium text-slate-400 ">
                        Đường dẫn
                    </label>
                    <input
                        id="link"
                        required
                        className="bg-slate-700 border  text-white text-sm rounded-lg
                            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "

                        onChange={(e) => setLink(e.target.value)} />
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="duration"
                        className="block mb-2 text-sm font-medium text-slate-400 ">
                        Thời lượng
                    </label>
                    <input
                        id="duration"
                        required
                        placeholder="50"
                        className="bg-slate-700 border  text-white text-sm rounded-lg
                            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        type="text"
                        onChange={(e) => setDuration(e.target.value)} />
                </div>
                <button type="submit" className="text-white bg-green-400 hover:bg-green-600 
                        focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
                        text-sm w-full sm:w-auto px-5 py-2.5 text-center ">
                    Thêm
                </button>
            </form>
            </div>
            

        </div>

    )
}

export default LessionAdd;
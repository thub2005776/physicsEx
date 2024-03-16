import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import courseImg from '../../assets/course.jpg';
import { Delete } from '../../components';

const LessionEdit = ({ auth, lession }) => {
    const [name, setName] = useState(lession && lession.name);
    const [link, setLink] = useState(lession && lession.link);
    const [duration, setDuration] = useState(lession && lession.duration);
    const [status, setStatus] = useState(false);
    const navigate = useNavigate();

    const [del, setDel] = useState(false);

    const handleDelete = (e) => {
        setDel(!e);
        if (e) {
            axios.delete(process.env.REACT_APP_SERVER_URL + `lessions/${lession._id}`)
                .then(res => {
                    alert("Đã xóa!");
                    navigate(0, { replace: true });
                })
                .catch(err => console.log(err))
        }
    }

    const handleExit = (e) => {
        setDel(!e);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const values = {
            "name": name,
            "link": link,
            "duration": duration
        }

        axios.post(process.env.REACT_APP_SERVER_URL + `lessions/${lession._id}`, values)
            .then(res => {
                if (res.status === 200) {
                    alert("Cập nhật thành công!");
                    navigate(0, { replace: true })
                }
            })
            .catch(err => console.log(err))

    }

    return (
        auth && auth.permission === "admin" && lession &&
        <div className="">
            <div className="flex justify-center gap-4">
                <button
                    type="button"
                    id="link"
                    className="flex-grow bg-slate-700 mb-1 text-left text-white text-sm rounded-lg h-10
                     focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5 truncate"
                    onClick={() => setStatus(!status)}>
                    {lession.name}
                </button>
                <button type="button" className="bg-red-400 mb-1 text-white text-sm rounded-lg h-10
                     hover:bg-red-500 block w-fit  p-2.5 "
                    onClick={() => setDel(!del)}>
                    Xóa
                </button>
            </div>
            {del &&
                <div className="absolute top-30 lg:left-[35%] md:left-[30%] left-[10%] z-[500]">
                    <Delete sendDelete={handleDelete} Exit={handleExit} />
                </div>}
            {status &&
                <div className="mx-4">
                    <div className="md:mx-8 mx-16 mb-2">
                        {link ? <iframe title={link} width={200} height={150} src={`https://www.youtube.com/embed/${link}`}></iframe>
                            : <img className="w-[220px] h-[150px]" src={courseImg} alt="review video" />}
                        <p className="text-gray-400 text-center text-base">Video xem trước</p>
                    </div>
                    <form className="flex-grow shadow bg-gray-900 rounded-lg p-3" onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-medium text-slate-400 ">
                                Chủ đề bài học
                            </label>
                            <input
                                id="name"
                                defaultValue={lession.name}
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
                                defaultValue={link}
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
                                defaultValue={lession.duration}
                                className="bg-slate-700 border  text-white text-sm rounded-lg
                            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                type="text"
                                onChange={(e) => setDuration(e.target.value)} />
                        </div>
                        <button type="submit" className="text-white bg-green-400 hover:bg-green-600 
                        focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
                        text-sm w-full sm:w-auto px-5 py-2.5 text-center ">
                            Cập nhật
                        </button>
                    </form>
                </div>}


        </div>

    )
}

export default LessionEdit;
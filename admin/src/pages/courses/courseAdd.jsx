import { useState } from "react";
import axios from 'axios';

const CourseAdd = ({ auth }) => {
    const [file, setFile] = useState(null);
    const [name, setName] = useState(null);
    const [grade, setGrade] = useState(null);
    const [link, setLink] = useState(null);
    const [content, setContent] = useState(null)
    const [level, setLevel] = useState(null);
    const [uploaded, setUploaded] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("file", file);

        const values = {
            "name": name,
            "grade": grade,
            "content": content,
            "img": file.name,
            "link": link,
            "level": level
        }

        axios.post(process.env.REACT_APP_SERVER_URL + "file/upload", data)
            .then(res => {
                if(res.status === 200) {
                    setUploaded(200)
                }
            })
            .catch(err => console.log(err))

        axios.post(process.env.REACT_APP_SERVER_URL + "courses", values)
            .then(res => {
                if(res.status === 200 && uploaded > 0) {
                    alert("Thêm thành công!");
                    window.location.reload();
                }
            })
            .catch(err => console.log(err))

    }

    return (
        auth && auth.permission === "admin" &&
        (<div className="lg:mx-80 mx-24 pt-10">
            <div className="sm:text-2xl text-lg text-teal-400 sm:font-bold font-semibold mb-6 text-center">
                Thông tin khóa học mới
            </div>
            <form className="shadow bg-gray-800 rounded-lg p-3" onSubmit={handleSubmit}>
                <div className="mb-6 text-base">
                    <span className="text-slate-400">Tải hình ảnh lên </span>
                    <input required className="ml-4 rounded-lg bg-emerald-400" type="file" name="file"
                        onChange={(e) => setFile(e.target.files[0])} />
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-slate-400 ">
                        Tên khóa học
                    </label>
                    <input type="text" id="name"
                        className="bg-slate-700 border  text-white 
                                text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                        placeholder="Vật lý 10.."
                        onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="grade"
                        className="block mb-2 text-sm font-medium text-slate-400 ">
                        Lớp
                    </label>
                    <input
                        type="text"
                        id="grade"
                        className="bg-slate-700 border  text-white text-sm rounded-lg
                            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        required
                        placeholder="12..."
                        onChange={(e) => setGrade(e.target.value)} />
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="link"
                        className="block mb-2 text-sm font-medium text-slate-400 ">
                        Đường dẫn
                    </label>
                    <input
                        type="text"
                        id="link"
                        className="bg-slate-700 border  text-white text-sm rounded-lg
                            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        required
                        onChange={(e) => setLink(e.target.value)} />
                </div>

                <div className="mb-6">
                    <label
                        htmlFor="content"
                        className="block mb-2 text-sm font-medium text-slate-400 ">
                        Nội dung
                    </label>
                    <textarea
                        id="content"
                        required
                        className="bg-slate-700 border  text-white text-sm rounded-lg
                            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "

                        onChange={(e) => setContent(e.target.value)} />
                </div>

                <div className="mb-6">
                    <label
                        htmlFor="level"
                        className="block mb-2 text-sm font-medium text-slate-400 ">
                        Độ khó
                    </label>
                    <div className="flex" id="level">
                        <div className="flex items-center me-4">
                            <input id="inline-radio" type="radio" name="inline-radio-group"
                                className="w-4 h-4 text-blue-600 focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
                                onClick={() => setLevel("easy")} />
                            <label htmlFor="inline-radio" className="ms-2 text-sm font-medium  text-gray-300">Dễ</label>
                        </div>
                        <div className="flex items-center me-4">
                            <input id="inline-2-radio" type="radio" name="inline-radio-group"
                                className="w-4 h-4 text-blue-600 focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
                                onClick={() => setLevel("medium")} />
                            <label htmlFor="inline-2-radio" className="ms-2 text-sm font-medium  text-gray-300">Trung bình</label>
                        </div>
                        <div className="flex items-center me-4">
                            <input id="inline-checked-radio" type="radio" name="inline-radio-group"
                                className="w-4 h-4 text-blue-600 focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
                                onClick={() => setLevel("hard")} />
                            <label htmlFor="inline-checked-radio" className="ms-2 text-sm font-medium  text-gray-300">Khó</label>
                        </div>
                        <div className="flex items-center me-4">
                            <input id="inline-checked-radio" type="radio" name="inline-radio-group"
                                className="w-4 h-4 text-blue-600 focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
                                onClick={() => setLevel("so hard")} />
                            <label htmlFor="inline-checked-radio" className="ms-2 text-sm font-medium  text-gray-300">Rất khó</label>
                        </div>
                    </div>

                </div>

                <button type="submit" className="text-white bg-green-400 hover:bg-green-600 
                        focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
                        text-sm w-full sm:w-auto px-5 py-2.5 text-center ">
                    Thêm
                </button>
            </form>

        </div>)
    )
}

export default CourseAdd;
import axios from "axios";
import { useState } from "react";
import { useLocation } from 'react-router';
import { useNavigate } from "react-router-dom";

const ExAdd = ({ auth }) => {

    const location = useLocation();
    const navigate = useNavigate();
    const path = location.pathname.split('/')[4]

    const [file, setFile] = useState(null);
    const [question, setQuestion] = useState();
    const [answer, setAnswer] = useState()
    const [content, setcontent] = useState()

    const handleSubmit = (e) => {
        e.preventDefault();

        const subThematic = path;
        const no = path + '_' + Date.now();
        const data = new  FormData();
        if(file === null) {
            alert("Bạn chưa tải ảnh lên!");
        } else {
            data.append('file', file);
            data.append('subThematic', subThematic);
            data.append('no',no);
            data.append('question', question);
            data.append('answer', answer);
            data.append('content', content);

            axios.post(process.env.REACT_APP_SERVER_URL + "add/ex", data)
            .then(res => {
                alert("Thêm thành công!");
                navigate(`/admin/2/them/${path}`);
                window.location.reload();
            })
            .catch(err => console.log(err))
        }
    }

    return (
        auth && auth.permission === "admin" && (
            <div className="lg:mx-72 mx-5">
                <div className="sm:text-2xl text-lg text-teal-400 sm:font-bold font-semibold mb-6 text-center">
                    Thông tin bài tập mới
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="sm:flex">
                        <div className="sm:flex-none w-2/3 sm:mr-5 sm:w-fit">
                            <div className="mb-6">
                                <label htmlFor="thematic" className="block mb-2 text-sm font-medium text-slate-400">
                                    Chuyên đề
                                </label>
                                <div id="thematic"
                                    className="bg-slate-700  
                                        text-slate-400 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 ">
                                    {path}
                                </div>
                            </div>
                            <div className="mb-6 text-teal-400">
                                Quy ước ký hiệu vật lý
                                <a href="https://www.cmor-faculty.rice.edu/~heinken/latex/symbols.pdf"
                                    className="ml-4 bg-green-400 rounded-md px-3 py-2 hover:bg-green-600 text-white"
                                    target="_blank" >
                                    Xem
                                </a>
                            </div>
                        </div>
                        <div className="sm:flex-2 sm:w-full">
                        <div className="mb-6">
                                <span className="text-slate-400">Tải hình ảnh lên </span>
                                <input className="ml-4 rounded-lg bg-emerald-400" type="file" name="file"
                                    onChange={(e) => setFile(e.target.files[0])} />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="message" className="block mb-2 text-sm font-medium text-slate-400 ">
                                    Đề bài
                                </label>
                                <textarea
                                    id="message"
                                    rows="3"
                                    className="block p-2.5 w-full text-sm text-slate-400 bg-slate-700 rounded-lg focus:ring-blue-500 "
                                    placeholder="Một con lắc lò xo gồm vật nặng khối lượng 0,4 kg gắn vào đầu lò xo có độ cứng 40 N/m..."
                                    onChange={(e) => setQuestion(e.target.value)} required>
                                </textarea>
                            </div>
                            <div className="mb-6">
                                <label htmlFor="message" className="block mb-2 text-sm font-medium text-slate-400 ">
                                    Đáp án
                                </label>
                                <textarea
                                    id="message"
                                    rows="2"
                                    className="block p-2.5 w-full text-sm text-slate-400 bg-slate-700 rounded-lg  focus:ring-blue-500 "
                                    placeholder="$x = 4\cos(10t)$ cm...."
                                    onChange={(e) => setAnswer(e.target.value)}required></textarea>
                            </div>
                            <div className="mb-6">
                                <label htmlFor="message" className="block mb-2 text-sm font-medium text-slate-400 ">
                                    Hướng dẫn giải
                                </label>
                                <textarea
                                    id="message"
                                    rows="3"
                                    className="block p-2.5 w-full text-sm text-slate-400 bg-slate-700 rounded-lg focus:ring-blue-500 "
                                    placeholder="Vật dao động theo phương trình tổng quát $x = A\cos(\omega t + \phi) $...."
                                    onChange={(e) => setcontent(e.target.value)}required></textarea>
                            </div>
                            <button type="submit"
                                className="text-white bg-green-400 hover:bg-green-600 
                                    focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
                                    text-sm w-auto px-5 py-2.5 text-center ">
                                Thêm
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        )
    )
}

export default ExAdd;
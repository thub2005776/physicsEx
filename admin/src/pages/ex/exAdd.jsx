import axios from "axios";
import { useState } from "react";
import { useLocation } from 'react-router';
import { useNavigate } from "react-router-dom";

const ExAdd = ({ auth, thematics }) => {

    const location = useLocation();
    const navigate = useNavigate();
    const themid = location.pathname.split('/')[3];
    const them = thematics && thematics.find(f => f._id === themid);

    const [file, setFile] = useState(null);
    const [question, setQuestion] = useState(null);
    const [answer, setAnswer] = useState()
    const [content, setcontent] = useState()
    const [uploaded, setUploaded] = useState(null);

    const HandleFileChange = (e) => {
        setFile(e.target.files[0]);
        const f = e.target.files[0]
        setUploaded(URL.createObjectURL(f));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        
        const data = new  FormData();
        
            data.append('file', file);

            const values = {
                "themid": themid,
                "subThematic": them && them.code,
                "no": Date.now(),
                "img": file && file.name,
                "question": question,
                "answer": answer,
                "content": content,
                "like": 0,
                "dislike": 0
            }

            axios.post(process.env.REACT_APP_SERVER_URL + "file/upload", data)
            .then(res => {
                if(res.status === 200) {console.log(res.data)}
            })
            .catch(err => console.log(err))

            axios.post(process.env.REACT_APP_SERVER_URL + "exercises", values)
            .then(res => {
                alert("Thêm thành công!");
                navigate(`/admin/2/view/${themid}`);
                window.location.reload();
            })
            .catch(err => console.log(err))
        
    }

    return (
        auth && auth.permission === "admin" && them && 
        (<div className="lg:mx-72 mx-5 pt-5 text-base">
                <div className="sm:text-2xl text-lg text-teal-400 sm:font-bold font-semibold mb-6 text-center">
                    Thông tin bài tập mới
                </div>
                <form className="bg-gray-800 p-4 rounded-md border border-gray-600 " onSubmit={handleSubmit}>
                    <div className="sm:flex">
                        <div className="sm:flex-none w-2/3 sm:mr-5 sm:w-fit">
                            <div className="mb-6">
                                <label htmlFor="thematic" className="block mb-2 text-sm font-medium text-slate-400">
                                    Chuyên đề
                                </label>
                                <div id="thematic"
                                    className="bg-slate-700  
                                        text-slate-400 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 ">
                                    {them.code}
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
                            {uploaded && <img className="mx-[28%] md:w-32 md:h-32 w-20 h-20 rounded-full border border-gray-400 p-1" src={uploaded} alt={file.name} />}
                        </div>
                        <div className="sm:flex-2 sm:w-full">
                        <div className="mb-6">
                                <span className="text-slate-400">Tải hình ảnh lên </span>
                                <input className="ml-4 rounded-lg bg-emerald-400" type="file" name="file"
                                required
                                    onChange={HandleFileChange} />
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
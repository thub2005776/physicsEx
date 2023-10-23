import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router';
import { useNavigate } from "react-router-dom";

const ExAdd = ({ auth }) => {
    const [exs, setExs] = useState();
    const [thematics, setThematics] = useState([]);

    const location = useLocation();
    const navigate = useNavigate();
    const path = location.pathname.split('/')[4]
    // console.log(path);

    useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER_URL + "exercises")
            .then(exercises => setExs(exercises.data))
            .catch(err => console.log(err))
    }, []);

    useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER_URL + "thematics")
            .then(thematics => setThematics(thematics.data))
            .catch(err => console.log(err))
    }, [])

    const them = thematics.find((f) => f.code === path);
    // console.log(them);

    const nos = exs && exs.length  && them ? 
                exs.filter(ex => ex.no.substring(0, 4) === them.code) : null;

    const [no, setNo] = useState(null);
    const [question, setQuestion] = useState(null);
    const [answer, setAnswer] = useState(null)
    const [content, setcontent] = useState(null)

    const handleSubbmit = (e) => {
        e.preventDefault();

        if(no === null) {
            alert("Bạn quên chọn chủ đề!");
        } else {
            const subThematic = them.code;
        axios.post(process.env.REACT_APP_SERVER_URL + 'add/ex', { subThematic, no, question, answer, content })
                .then(res => {
                    alert("Cập nhật thành công!");
                    // navigate('/admin/2');
                    // window.location.reload(true);
                })
                .catch(err => console.log(err));
        }
    }

    return (
        auth && auth.permission === "admin" && exs && exs.length && thematics && thematics.length ? (
            <div className="lg:mx-72 mx-5">
                <div className="sm:text-2xl text-lg text-teal-400 sm:font-bold font-semibold mb-6 text-center">
                    Thông tin bài tập mới
                </div>
                <form onSubmit={handleSubbmit}>
                    <div className="sm:flex">
                        <div className="sm:flex-none w-2/3 sm:mr-5 sm:w-fit">
                            <div className="mb-6">
                                <label htmlFor="thematic" className="block mb-2 text-sm font-medium text-slate-400">
                                    Chuyên đề
                                </label>
                               <div id="thematic" 
                                    className="bg-slate-700  
                                        text-slate-400 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 ">
                                    {them.code} : {them.thematic}
                                </div>
                            </div>
                            <div className="mb-6">
                                <label htmlFor="topic" className="block mb-2 text-sm font-medium text-slate-400">
                                    Chủ đề
                                </label>
                                <select
                                    id="topic"
                                    className="bg-slate-700  
                                        text-slate-400 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5"
                                    onClick={(e) => setNo(e.target.value)}>
                                    <option>---Chọn chủ đề---</option>
                                    {Array.isArray(nos) ? nos.map((n, i) => (
                                        <option key={i}>{n.no}</option>
                                    )) : <option>{nos}</option>}
                                </select>
                                {/* {console.log(no)} */}
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
                                <label htmlFor="message" className="block mb-2 text-sm font-medium text-slate-400 ">
                                    Đề bài
                                </label>
                                <textarea
                                    id="message"
                                    rows="3"
                                    className="block p-2.5 w-full text-sm text-slate-400 bg-slate-700 rounded-lg focus:ring-blue-500 "
                                    placeholder="Một con lắc lò xo gồm vật nặng khối lượng 0,4 kg gắn vào đầu lò xo có độ cứng 40 N/m..."
                                    onChange={(e) => setQuestion(e.target.value)}>
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
                                    onChange={(e) => setAnswer(e.target.value)}></textarea>
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
                                    onChange={(e) => setcontent(e.target.value)}></textarea>
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
        ) : 
        <div className='text-orange-700 text-lg  sm:text-xl text-center'>
            Bạn không thể truy cập vào trang web này!
        </div>
    )
}

export default ExAdd;
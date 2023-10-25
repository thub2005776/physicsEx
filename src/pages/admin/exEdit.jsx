
import { useLocation } from 'react-router';
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ExEdit = ({ auth }) => {

    const [no, setNo] = useState(null);
    const [subThematic, setSubThematic] = useState(null);
    const [question, setQuestion] = useState(null);
    const [answer, setAnswer] = useState(null);
    const [content, setContent] = useState(null);
    const navigate = useNavigate()
    const [exercises, setExercises] = useState();
    const location = useLocation();
    const path = location.pathname.split('/')[4];
    // console.log(path);

    useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER_URL + "exercises")
            .then(res => {
                setExercises(res.data);
            })
            .catch(err => console.log(err))
    }, []);

    // console.log(thematics);
    const exercise = exercises ? exercises.find((f) => f.no === path) : null;
    // console.log(th);

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();
        if (no !== null) {
            data.append("no", no);
        } else {
            data.append("no", exercise.no);
        }
        if (subThematic !== null) {
            data.append("subThematic", subThematic);
        } else {
            data.append("subThematic", exercise.subThematic);
        }
        if (question !== null) {
            data.append("question", question);
        } else {
            data.append("question", exercise.question);
        }
        if (answer !== null) {
            data.append("answer", answer);
        } else {
            data.append("answer", exercise.answer);
        }
        if (content !== null) {
            data.append("content", content);
        } else {
            data.append("content", exercise.content);
        }

        data.append("id", exercise.no);

        axios.post(process.env.REACT_APP_SERVER_URL + "edit/ex", data)
            .then(res => {
                alert("Cập nhật thành công!");
                // console.log(res)
                navigate('/admin/2')
            })
            .catch(err => console.log(err))

    }
    return (
        auth && auth.permission === "admin" && exercise &&
        (<div className="lg:mx-52 mx-10">
            <div className="sm:text-2xl text-lg text-teal-400 sm:font-bold font-semibold mb-6 text-center">
                Thông tin bài tập
            </div>
            <form onSubmit={handleSubmit}>
                <div className='flex justify-between gap-5'>
                    <div className="mb-6 w-full">
                    <label htmlFor='subThematic'
                        className="block mb-2 text-sm font-medium text-slate-400">
                            Mã chuyên đề
                        </label>
                    <input 
                        id='subThematic'
                        className="bg-slate-700 border  text-gray-900 
                                text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                        type="text" 
                        name="subThematic"
                        placeholder={exercise.subThematic}
                        onChange={(e) => setSubThematic(e.target.value)} />
                </div>
                <div className="mb-6 w-full">
                    <label
                        htmlFor="no"
                        className="block mb-2 text-sm font-medium text-slate-400 ">
                        Mã chủ đề
                    </label>
                    <input type="text" id="no"
                        className="bg-slate-700 border  text-gray-900 
                                text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder={exercise.no}
                        onChange={(e) => setNo(e.target.value)} />
                </div>
                </div>
                
                <div className="mb-6">
                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-slate-400 ">
                        Đề bài
                    </label>
                    <textarea
                        id="message"
                        rows="4"
                        className="block p-2.5 w-full text-sm text-slate-400 bg-slate-700 rounded-lg focus:ring-blue-500 "
                        onChange={(e) => setQuestion(e.target.value)}>
                        {exercise.question}
                    </textarea>
                </div>
                <div className="mb-6">
                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-slate-400 ">
                        Đáp án
                    </label>
                    <textarea
                        id="message"
                        rows="3"
                        className="block p-2.5 w-full text-sm text-slate-400 bg-slate-700 rounded-lg focus:ring-blue-500 "
                        onChange={(e) => setAnswer(e.target.value)}>{exercise.answer}</textarea>
                </div>
                <div className="mb-6">
                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-slate-400 ">
                        Hướng dẫn giải
                    </label>
                    <textarea
                        id="message"
                        rows="4"
                        className="block p-2.5 w-full text-sm text-slate-400 bg-slate-700 rounded-lg focus:ring-blue-500 "
                        onChange={(e) => setContent(e.target.value)}>{exercise.content}</textarea>
                </div>
                <button type="submit" className="text-white bg-green-400 hover:bg-green-600 
                        focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
                        text-sm w-full sm:w-auto px-5 py-2.5 text-center ">
                    Cập nhật
                </button>
            </form>

        </div>)
    )
}

export default ExEdit;
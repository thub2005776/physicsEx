
import { useLocation } from 'react-router';
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ExEdit = ({ auth, exercises }) => {

    const navigate = useNavigate()
    const location = useLocation();
    const path = location.pathname.split('/')[4];

    const exercise = exercises ? exercises.find((f) => f.no === path) : null;
    const [id, setId] = useState(exercise && exercise._id);
    const [no, setNo] = useState(exercise && exercise.no);
    const [subThematic, setSubThematic] = useState(exercise && exercise.subThematic);
    const [question, setQuestion] = useState(exercise && exercise.question);
    const [answer, setAnswer] = useState(exercise && exercise.answer);
    const [content, setContent] = useState(exercise && exercise.content);
    const [img, setImg] = useState(exercise && exercise.img);
    const [file, setFile] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('id', id);
        data.append('file', file);
        data.append('subThematic', subThematic);
        data.append('no', no);
        data.append('question', question);
        data.append('answer', answer);
        data.append('content', content);
        data.append('img', img);

        axios.post(process.env.REACT_APP_SERVER_URL + "edit/ex", data)
            .then(res => {
                alert("Cập nhật thành công!");
                navigate('/admin/2/them/' + exercise.subThematic);
                window.location.reload();
            })
            .catch(err => console.log(err))

    }
    return (
        auth && auth.permission === "admin" && exercise &&
        (<div className="lg:mx-52 mx-10 p-5">
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
                        rows="4"
                        className="block p-2.5 w-full text-sm text-slate-400 bg-slate-700 rounded-lg focus:ring-blue-500 "
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder={exercise.question}>

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
                        onChange={(e) => setAnswer(e.target.value)} placeholder={exercise.answer}></textarea>
                </div>
                <div className="mb-6">
                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-slate-400 ">
                        Hướng dẫn giải
                    </label>
                    <textarea
                        id="message"
                        rows="4"
                        className="block p-2.5 w-full text-sm text-slate-400 bg-slate-700 rounded-lg focus:ring-blue-500 "
                        onChange={(e) => setContent(e.target.value)} placeholder={exercise.content}></textarea>
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
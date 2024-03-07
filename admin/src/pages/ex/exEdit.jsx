
import { useLocation } from 'react-router';
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ExEdit = ({ auth, exercises }) => {

    const navigate = useNavigate()
    const location = useLocation();
    const path = location.pathname.split('/')[4];

    const exercise = exercises && exercises.find((f) => f._id === path);

    const id = exercise && exercise._id;
    const [no, setNo] = useState(exercise && exercise.no);
    const [subThematic, setSubThematic] = useState(exercise && exercise.subThematic);
    const [question, setQuestion] = useState(exercise && exercise.question);
    const [answer, setAnswer] = useState(exercise && exercise.answer);
    const [content, setContent] = useState(exercise && exercise.content);
    const [img, setImg] = useState(exercise && exercise.img);
    const [file, setFile] = useState(null);
    const [uploaded, setUploaded] = useState(null);

    const HandleFileChange = (e) => {
        setFile(e.target.files[0]);
        setImg(e.target.files[0].name);
        const f = e.target.files[0]
        setUploaded(URL.createObjectURL(f));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('file', file);

        const values = {
            'subThematic': subThematic,
            'no': no,
            'question': question,
            'answer': answer,
            'content': content,
            'img': img
        }

        axios.post(process.env.REACT_APP_SERVER_URL + "file/upload", data)
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data);
                }
            })
            .catch(err => console.log(err))

        axios.post(process.env.REACT_APP_SERVER_URL + `exercises/${id}`, values)
            .then(res => {
                if(res.status === 200) {
                    alert("Cập nhật thành công!");
                navigate(-1);
                window.location.reload();
                }
                
            })
            .catch(err => console.log(err))

    }
    return (
        auth && auth.permission === "admin" && exercise &&
        (<div className="lg:mx-52 mx-10 p-5">
            <div className="sm:text-2xl text-lg text-teal-400 sm:font-bold font-semibold mb-6 text-center">
                Thông tin bài tập
            </div>
            <form onSubmit={handleSubmit} className='p-4 bg-gray-800 border border-gray-600 rounded-md'>
                <div className='flex justify-between gap-5'>
                    <div className="mb-6 w-full">
                        <label htmlFor='subThematic'
                            className="block mb-2 text-sm font-medium text-slate-400">
                            Mã chuyên đề
                        </label>
                        <input
                            id='subThematic'
                            className="bg-slate-700 border  
                                text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            type="text"
                            name="subThematic"
                            defaultValue={exercise.subThematic}
                            onChange={(e) => setSubThematic(e.target.value)} />
                    </div>
                    <div className="mb-6 w-full">
                        <label
                            htmlFor="no"
                            className="block mb-2 text-sm font-medium text-slate-400 ">
                            Mã chủ đề
                        </label>
                        <input type="text" id="no"
                            className="bg-slate-700 border  
                                text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            defaultValue={exercise.no}
                            onChange={(e) => setNo(e.target.value)} />
                    </div>
                </div>
                <div className="flex justify-around gap-4 mb-6 text-base">
                    <div className=''>
                        <div className="text-slate-400 text-center mb-2">Tải hình ảnh lên </div>
                    <input className="ml-4 rounded-lg bg-emerald-400" type="file" name="file"
                        onChange={HandleFileChange} />
                    </div>
                    
                     {uploaded && <img className=" w-20 h-20 rounded-full border border-gray-400 p-1" src={uploaded} alt={file.name} />}
                </div>
               
                <div className="mb-6">
                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-slate-400 ">
                        Đề bài
                    </label>
                    <textarea
                        id="message"
                        rows="4"
                        className="block p-2.5 w-full text-sm bg-slate-700 rounded-lg focus:ring-blue-500 "
                        onChange={(e) => setQuestion(e.target.value)}
                        defaultValue={exercise.question}>

                    </textarea>
                </div>
                <div className="mb-6">
                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-slate-400 ">
                        Đáp án
                    </label>
                    <textarea
                        id="message"
                        rows="3"
                        className="block p-2.5 w-full text-sm bg-slate-700 rounded-lg focus:ring-blue-500 "
                        onChange={(e) => setAnswer(e.target.value)} 
                        defaultValue={exercise.answer}></textarea>
                </div>
                <div className="mb-6">
                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-slate-400 ">
                        Hướng dẫn giải
                    </label>
                    <textarea
                        id="message"
                        rows="4"
                        className="block p-2.5 w-full text-sm  bg-slate-700 rounded-lg focus:ring-blue-500 "
                        onChange={(e) => setContent(e.target.value)} 
                        defaultValue={exercise.content}></textarea>
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
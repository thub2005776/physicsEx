import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router';
import { QuestionEdit } from "../../components";

const TestEdit = ({ auth, tests, questions }) => {
    const location = useLocation();
    const id = location.pathname.split('/')[3];
    const test = tests && tests.find(f => f._id === id);
    const questionList = questions && questions.filter(f => f.tid === id)

    const [file, setFile] = useState(null);
    const [name, setName] = useState(test && test.name);
    const [grade, setGrade] = useState(test && test.grade);
    const [tag, setTag] = useState(test && test.tag);
    const [content, setContent] = useState(test && test.content)
    const [level, setLevel] = useState(test && test.level);
    const [duration, setDuration] = useState(test && test.duration);
    const [uploaded, setUploaded] = useState(null);

    const navigate = useNavigate();

    const HandleFileChange = (e) => {
        setFile(e.target.files[0]);
        const f = e.target.files[0]
        setUploaded(URL.createObjectURL(f));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("file", file);

        const values = {
            "name": name,
            "grade": grade,
            "content": content,
            "img": file && file.name ? file.name : test.img,
            "tag": tag,
            "level": level,
            "duration": duration
        }

        if(file) {
            axios.post(process.env.REACT_APP_SERVER_URL + "file/upload", data)
            .then(res => { console.log(res.data)})
            .catch(err => console.log(err))

        // axios.delete(process.env.REACT_APP_SERVER_URL + `file/remove/${test.img}`)
        //     .then(res => { console.log(res.data) })
        //     .catch(err => console.log(err))
        }

        axios.put(process.env.REACT_APP_SERVER_URL + `tests/${test._id}`, values)
            .then(res => {
                if (res.status === 200) {
                    alert('Cập nhật thông tin bài kiểm tra thành công!')
                    navigate(`/admin/5/${res.data._id}`, { replace: true })
                } else { alert("Xảy ra lỗi khi cập nhật") }

            })
            .catch(err => console.log(err))

    }

    return (
        auth && auth.permission === "admin" && test &&
        (<div className="pt-10">
            <div className="sm:text-2xl text-lg text-teal-400 sm:font-bold font-semibold mb-6 text-center">
                Cập nhật bài kiểm tra
            </div>
            <div className="sm:flex justify-center gap-4">
                {/* Test edition part */}
                <form className="lg:w-1/3 shadow bg-gray-800 rounded-lg p-3" onSubmit={handleSubmit}>
                    {uploaded ? <img className="mx-[38%] md:w-32 md:h-32 w-20 h-20 mb-6 rounded-full border border-gray-400 p-1" src={uploaded} alt={file.name} />
                        : <img className="mx-[38%] md:w-32 md:h-32 w-20 h-20 mb-6 rounded-full border border-gray-400 p-1" src={process.env.REACT_APP_SERVER_URL + test.img} alt={test.name} />}
                    <div className="mb-6 text-base">
                        <span className="text-slate-400">Tải hình ảnh lên </span>
                        <input className="ml-4 rounded-lg bg-emerald-400" type="file" name="file"
                            onChange={HandleFileChange} />

                    </div>


                    <div className="mb-6">
                        <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-slate-400 ">
                            Tên bài kiểm tra
                        </label>
                        <input type="text" id="name"
                            className="bg-slate-700 border  text-white 
                                text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            defaultValue={test.name}
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
                            defaultValue={test.grade}
                            onChange={(e) => setGrade(e.target.value)} />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="link"
                            className="block mb-2 text-sm font-medium text-slate-400 ">
                            Thời lượng bài kiểm tra (phút)
                        </label>
                        <input
                            type="text"
                            id="link"
                            className="bg-slate-700 border  text-white text-sm rounded-lg
                            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            defaultValue={test.duration}
                            onChange={(e) => setDuration(e.target.value)} />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="link"
                            className="block mb-2 text-sm font-medium text-slate-400 ">
                            Liên quan
                        </label>
                        <input
                            type="text"
                            id="link"
                            className="bg-slate-700 border  text-white text-sm rounded-lg
                            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            defaultValue={test.tag}
                            onChange={(e) => setTag(e.target.value)} />
                    </div>

                    <div className="mb-6">
                        <label
                            htmlFor="content"
                            className="block mb-2 text-sm font-medium text-slate-400 ">
                            Nội dung
                        </label>
                        <textarea
                            id="content"
                            className="bg-slate-700 border  text-white text-sm rounded-lg
                            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            defaultValue={test.content}
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
                                    defaultChecked={test.level === 'easy'}
                                    onClick={() => setLevel("easy")} />
                                <label htmlFor="inline-radio" className="ms-2 text-sm font-medium  text-gray-300">Dễ</label>
                            </div>
                            <div className="flex items-center me-4">
                                <input id="inline-2-radio" type="radio" name="inline-radio-group"
                                    className="w-4 h-4 text-blue-600 focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
                                    defaultChecked={test.level === 'medium'}
                                    onClick={() => setLevel("medium")} />
                                <label htmlFor="inline-2-radio" className="ms-2 text-sm font-medium  text-gray-300">Trung bình</label>
                            </div>
                            <div className="flex items-center me-4">
                                <input id="inline-checked-radio" type="radio" name="inline-radio-group"
                                    className="w-4 h-4 text-blue-600 focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
                                    defaultChecked={test.level === 'hard'}
                                    onClick={() => setLevel("hard")} />
                                <label htmlFor="inline-checked-radio" className="ms-2 text-sm font-medium  text-gray-300">Khó</label>
                            </div>
                            <div className="flex items-center me-4">
                                <input id="inline-checked-radio" type="radio" name="inline-radio-group"
                                    className="w-4 h-4 text-blue-600 focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
                                    defaultChecked={test.level === 'so hard'}
                                    onClick={() => setLevel("so hard")} />
                                <label htmlFor="inline-checked-radio" className="ms-2 text-sm font-medium  text-gray-300">Rất khó</label>
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="text-white bg-green-400 hover:bg-green-600 
                        focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
                        text-sm w-full sm:w-auto px-5 py-2.5 text-center ">
                        Cập nhật
                    </button>
                </form>

                {/* Question editon part */}
                <div className="lg:w-1/3">
                    <div className="sm:text-lg text-base text-gray-400 sm:font-bold font-semibold mb-6 text-center">
                        Cập nhật câu hỏi
                    </div>
                    <div className="p-2 bg-gray-800 border border-gray-600 rounded-md">
                        {questionList && questionList.map((q, i) => (
                            <QuestionEdit key={i} quest={q} />
                        ))}
                    </div>
                </div>
            </div>
        </div>)
    )
}

export default TestEdit;
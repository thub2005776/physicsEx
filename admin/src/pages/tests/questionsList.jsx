import { useState } from "react";
import axios from 'axios';
import { useLocation } from 'react-router';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const QuestionsList = ({ auth }) => {
    const [active, setActive] = useState('manual');
    const [file, setFile] = useState(null);
    const [question, setQuestion] = useState(null);
    const [selections, setSelections] = useState([]);
    const [trueAns, setTrueAns] = useState(null);
    const [explain, setExplain] = useState(null);
    const location = useLocation();
    const tid = location.pathname.split('/')[4];

    const codeString =
        `{
        "tid": "${tid}",
        "question": "Câu hỏi",
        "selections": 
        [
            {"0": "a..."},
            {"1": "b..."},
            {"2": "c..."}
        ],
        "trueAns": "a",
        "explain": "Bởi vì..."
}`;

    const handleAddInput = () => {
        setSelections([...selections, '']);
    };

    const handleChangeInput = (index, value) => {
        const updatedSelections = [...selections];
        updatedSelections[index] = value;
        setSelections(updatedSelections);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(selections.length > 2) {
            const data = new FormData();
            data.append("file", file);
    
            const temp = selections.map((e, i) => {
                const newObj = {};
                newObj[i] = e;
                return newObj;
            })
    
            const values = {
                "tid": tid,
                "question": question,
                "selections": temp,
                "trueAns": trueAns,
                "explain": explain
            }
    
            if(!file) {
                axios.post(process.env.REACT_APP_SERVER_URL + "questions", values)
                .then(res => {
                    if (res.status === 200) {
                        alert("Thêm thành công!");
                        document.location.reload();
                    }
                })
                .catch(err => console.log(err))
            } else { 
                axios.post(process.env.REACT_APP_SERVER_URL + `file/upload/${file.name}`, data)
                .then(res => {
                    if (res.status === 200) {
                        alert("Thêm thành công!");
                        document.location.reload();
                    }
                })
                .catch(err => console.log(err))
            }
    
        } else { alert('Bạn phải nhập ít nhất 2 lựa chọn')}

    }

    return (
        auth && auth.permission === "admin" &&
        <div className="pt-10">
            <div className="sm:text-2xl text-lg text-teal-400 sm:font-bold font-semibold mb-6 text-center">
                Thông tin bài kiểm tra mới
            </div>
            <form className="lg:mx-52 md:mx-32 mx-5 shadow bg-gray-900 rounded-lg p-3" onSubmit={handleSubmit}>
                <ul className="text-sm font-medium text-center  rounded-lg shadow flex divide-gray-700 text-gray-400">
                    <li className="w-full focus-within:z-10">
                        <div className={`inline-block w-full p-4  border-r  border-gray-700 rounded-s-lg focus:ring-4 focus:ring-blue-300 focus:outline-none  text-white bg-gray-800 hover:bg-green-500 hover:cursor-pointer 
                        ${active === 'manual' && 'bg-green-600'}`}
                            onClick={() => setActive('manual')}>Nhập thủ công</div>
                    </li>
                    <li className="w-full focus-within:z-10">
                        <div className={`inline-block w-full p-4  border-r  border-gray-700 rounded-e-lg  focus:ring-4 focus:ring-blue-300 focus:outline-none text-white bg-gray-800 hover:bg-green-500 hover:cursor-pointer 
                        ${active === 'uploadFile' && 'bg-green-600'}`}
                            onClick={() => setActive('uploadFile')}>Upload file</div>
                    </li>
                </ul>

                {active === 'uploadFile' &&
                    <div className="my-6 text-base">
                        <p>Định dạng file (.json)</p>
                        <p className="text-gray-500">Ví dụ:</p>
                        <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
                            {codeString}
                        </SyntaxHighlighter>
                        <input required className=" rounded-lg bg-emerald-400 text-sm" type="file" name="file" accept="application/json"
                            onChange={(e) => setFile(e.target.files[0])} />
                    </div>}
                {active === 'manual' &&
                    <div>
                        <div className="mb-6">
                            <label
                                htmlFor="question"
                                className="block mb-2 text-sm font-medium text-slate-400 ">
                                Câu hỏi
                            </label>
                            <textarea
                                id="question"
                                rows={4}
                                required
                                className="bg-slate-700 border  text-white text-sm rounded-lg
                            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "

                                onChange={(e) => setQuestion(e.target.value)} />
                        </div>

                        <div className="mb-6">
                            <label
                                htmlFor="selection"
                                className="block mb-2 text-sm font-medium text-slate-400 ">
                                Các lựa chọn
                            </label>
                            <div className="">
                                <button type="button" className="mb-3 text-white bg-green-400 hover:bg-green-600 
                                focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
                                text-sm w-full sm:w-auto px-5 py-2.5 text-center "
                                    onClick={handleAddInput}>
                                    Thêm lựa chọn
                                </button>
                                {selections.map((e, i) => (
                                    <input
                                        key={i}
                                        type="text"
                                        id="selection"
                                        className="bg-slate-700 border mb-2 text-white text-sm rounded-lg
                                        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                        required
                                        placeholder={String.fromCharCode(i + 65) + '. '}
                                        onChange={(e) => handleChangeInput(i, e.target.value)} />
                                ))
                                }


                            </div>
                        </div>
                        <div className="mb-6">
                            <label
                                htmlFor="explain"
                                className="block mb-2 text-sm font-medium text-slate-400 ">
                                Giải thích
                            </label>
                            <textarea
                                id="explain"
                                rows={4}
                                required
                                className="bg-slate-700 border  text-white text-sm rounded-lg
                            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "

                                onChange={(e) => setExplain(e.target.value)} />
                        </div>
                        <div className="mb-6">
                            <label
                                htmlFor="Ans"
                                className="block mb-2 text-sm font-medium text-slate-400 ">
                                Đáp án
                            </label>
                            <div className="flex gap-4" id="Ans">
                                {selections.length > 0 && selections.map((e, i) => (
                                    <div key={i}>
                                        <input id="inline-radio" type="radio" name="inline-radio-group"
                                            className="w-4 h-4 text-blue-600 focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
                                            onClick={() => setTrueAns(i.toString())} />
                                        <label htmlFor="inline-radio" className="ms-2 text-sm font-medium  text-gray-300">{String.fromCharCode(i + 65)}</label>
                                    </div>
                                ))}

                            </div>

                        </div>

                    </div>}



                <button type="submit" className="text-white bg-green-400 hover:bg-green-600 
                        focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
                        text-sm w-full sm:w-auto px-5 py-2.5 text-center ">
                    Thêm
                </button>
            </form>

        </div>

    )
}

export default QuestionsList;
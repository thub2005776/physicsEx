import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { Delete } from '..';

const QuestionEdit = ({ quest }) => {
    const [question, setQuestion] = useState(quest && quest.question);
    const [selections, setSelections] = useState(quest && quest.selections);
    const [trueAns, setTrueAns] = useState(quest && quest.trueAns);
    const [explain, setExplain] = useState(quest && quest.explain);
    const [status, setStatus] = useState(false);
    const [addInput, setAddInput] = useState(false);
    const [selection, setSelection] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [err, setErr] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [file, setFile] = useState(null);
    const [uploaded, setUploaded] = useState(null);

    const handleChangeInput = (index, value) => {

        const updatedSelections = [...selections];
        const temp = {};
        temp[index] = value
        updatedSelections[index] = temp;
        setSelections(updatedSelections);
    };

    const HandleFileChange = (e) => {
        setFile(e.target.files[0]);
        const f = e.target.files[0]
        setUploaded(URL.createObjectURL(f));
    }

    const HandleDeleteInput = (index) => {
        const updatedSelections = [...selections];
        if (updatedSelections.length > 2) {
            updatedSelections.splice(index, 1);
            setSelections(updatedSelections);
        } else {
            setErr(true)
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }

    const [del, setDel] = useState(false);
    const navigate = useNavigate();

    const handleDelete = (e) => {
        setDel(!e);
        if (e) {
            axios.delete(process.env.REACT_APP_SERVER_URL + `questions/${quest._id}`)
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

        if (selections.length > 1) {
            const temp = selections.map((e, i) => {
                const newObj = {};
                newObj[i] = e;
                return newObj;
            })
            const values = {
                "tid": quest && quest.tid,
                "question": question,
                "img": file && file.name,
                "selections": temp,
                "trueAns": trueAns,
                "explain": explain
            }

            if (file) {
                const data = new FormData();
                data.append("file", file);

                axios.post(process.env.REACT_APP_SERVER_URL + "file/upload", data)
                    .then(res => { console.log(res.data) })
                    .catch(err => console.log(err))
            }

            axios.put(process.env.REACT_APP_SERVER_URL + `questions/${quest._id}`, values)
                .then(res => {
                    if (res.status === 200) {
                        alert("Cập nhật thành công!");
                    }
                })
                .catch(err => console.log(err))


        } else { alert('Bạn phải nhập ít nhất 2 lựa chọn') }

    }

    return (
        quest &&
        <div>
            <div className="flex justify-center gap-4">
                <button
                    type="button"
                    id="link"
                    className="flex-grow bg-slate-700 mb-1 text-white text-sm rounded-lg h-10
                     focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5 truncate"
                    onClick={() => setStatus(!status)}>
                    {quest.question}
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
                <form className="w-full shadow bg-gray-900 rounded-lg p-3" onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label
                            htmlFor="question"
                            className="block mb-2 text-sm font-medium text-slate-400 ">
                            Câu hỏi
                        </label>
                        <textarea
                            id="question"
                            defaultValue={quest.question}
                            className="bg-slate-700 border  text-white text-sm rounded-lg
                            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "

                            onChange={(e) => setQuestion(e.target.value)} />
                    </div>
                    {uploaded ? <img className="mx-auto md:w-32  mb-6 rounded-lg border border-gray-400 p-1" src={uploaded} alt={file.name} />
                        : <img className="mx-auto md:w-32 mb-6 rounded-lg border border-gray-400 p-1" src={process.env.REACT_APP_SERVER_URL + quest.img} alt="Ảnh" />}
                    <div className="mb-6 text-base">
                        <span className="text-slate-400">Tải hình ảnh lên </span>
                        <input className="ml-4 rounded-lg bg-emerald-400" type="file" name="file"
                            onChange={HandleFileChange} />

                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="selection"
                            className="block mb-2 text-sm font-medium text-slate-400 ">
                            Các lựa chọn
                        </label>
                        <div className="">

                            {selections.map((e, i) => (
                                <div key={i} className="flex justify-center gap-2">
                                    <input
                                        type="text"
                                        id="selection"
                                        className="bg-slate-700 border mb-2 text-white text-sm rounded-lg
                                        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                        defaultValue={selections[i][i]}
                                        onChange={(e) => handleChangeInput(i, e.target.value)} />

                                    <button type="button" className="bg-red-400 mb-1 text-white text-sm rounded-lg h-10 hover:bg-red-500 block w-fit  p-2.5 "
                                        onClick={() => HandleDeleteInput(i)}>
                                        Xóa
                                    </button>
                                </div>

                            ))}
                            {err && <p className={`text-red-800 text-xs mb-2 ${!isVisible && 'hidden'}`}>Lựa chọn không được ít hơn 2</p>}
                            <div className="">
                                <button type="button" className="mb-3 text-white bg-green-400 hover:bg-green-600 
                                focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
                                text-sm w-full sm:w-auto px-5 py-2.5 text-center "
                                    onClick={() => setAddInput(!addInput)}>
                                    Thêm lựa chọn
                                </button>
                                {addInput &&
                                    <div className="flex justify-center gap-2">
                                        <input
                                            type="text"
                                            id="selection"
                                            className="bg-slate-700 border mb-2 text-white text-sm rounded-lg
                                        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                            required
                                            value={inputValue}
                                            onChange={(e) => {
                                                setSelection(e.target.value)
                                                setInputValue(e.target.value)
                                            }} />
                                        <button type="button" className="mb-3 text-white bg-blue-400 hover:bg-blue-600 
                                focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
                                text-sm w-full sm:w-auto px-5 py-2.5 text-center "
                                            onClick={() => {
                                                handleChangeInput(selections.length, selection)
                                                setInputValue(' ')
                                            }}>
                                            Thêm
                                        </button>
                                    </div>}
                            </div>
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
                            defaultValue={quest.explain}
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
                                        defaultChecked={quest.trueAns === Object.keys(selections[i])[0]}
                                        onClick={() => setTrueAns(i.toString())} />
                                    <label htmlFor="inline-radio" className="ms-2 text-sm font-medium  text-gray-300">{String.fromCharCode(i + 65)}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button type="submit" className="text-white bg-green-400 hover:bg-green-600 
                        focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
                        text-sm w-full sm:w-auto px-5 py-2.5 text-center ">
                        Cập nhật
                    </button>
                </form>}
        </div>



    )
}

export default QuestionEdit;
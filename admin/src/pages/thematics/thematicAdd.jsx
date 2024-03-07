import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ThematicAdd = ({ auth, thematics }) => {
    const [file, setFile] = useState(null);
    const [code, setCode] = useState(null);
    const [them, setThem] = useState(null);
    const navigate = useNavigate();
    const [uploaded, setUploaded] = useState(null);

    const HandleFileChange = (e) => {
        setFile(e.target.files[0]);
        const f = e.target.files[0]
        setUploaded(URL.createObjectURL(f));
    }
    const thematic = thematics && thematics.find((f) => f.code === code);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (thematic) {
            alert('Mã chuyên đề đã tồn tại!');
        } else if (file === null) {
            alert('Bạn chưa tải ảnh lên!');
        } else {
            const data = new FormData();
            data.append("file", file);

            const values = {
                "code": code,
                "thematic": them,
                "img": file && file.name
            }

            axios.post(process.env.REACT_APP_SERVER_URL + "file/upload", data)
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data);
                }
            })
            .catch(err => console.log(err))

            axios.post(process.env.REACT_APP_SERVER_URL + "thematics", values)
                .then(res => {
                    alert("Thêm thành công!");
                    navigate(`/admin/2/ex/${res.data._id}`);
                })
                .catch(err => console.log(err))
        }

    }

    return (
        auth && auth.permission === "admin" && 
            (<div className="lg:mx-80 mx-24 pt-2 ">
                <div className="sm:text-2xl text-lg text-teal-400 sm:font-bold font-semibold mb-6 text-center">
                    Thông tin chuyên đề mới
                </div>
                <form onSubmit={handleSubmit} className="p-4 bg-gray-800 border border-gray-600 rounded-md">
                    <div className="mb-6 text-base">
                        <span className="text-slate-400">Tải hình ảnh lên </span>
                        <input className="ml-4 rounded-lg bg-emerald-400" type="file" name="file"
                            required
                            onChange={HandleFileChange} />
                    </div>
                    {uploaded && <img className="mx-[38%] md:w-32 md:h-32 w-20 h-20 rounded-full border border-gray-400 p-1" src={uploaded} alt={file.name} />}
                    <div className="mb-6">
                        <label
                            htmlFor="code"
                            className="block mb-2 text-sm font-medium text-slate-400 ">
                            Mã chuyên đề
                        </label>
                        <input type="text" id="code"
                            className="bg-slate-700 border  text-white 
                                text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required
                            placeholder="1201.."
                            onChange={(e) => setCode(e.target.value)} />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="thematic"
                            className="block mb-2 text-sm font-medium text-slate-400 ">
                            Tên chuyên đề
                        </label>
                        <input
                            type="thematic"
                            id="thematic"
                            className="bg-slate-700 border  text-white text-sm rounded-lg
                            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            required
                            placeholder="Dao động cơ..."
                            onChange={(e) => setThem(e.target.value)} />
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

export default ThematicAdd;
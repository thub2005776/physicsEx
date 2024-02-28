import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ThematicAdd = ({ auth, thematics }) => {
    const [file, setFile] = useState(null);
    const [code, setCode] = useState(null);
    const [them, setThem] = useState(null);
    const navigate = useNavigate();

    const thematic = thematics ? thematics.find((f) => f.code === code) : null;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (thematic) {
            alert('Mã chuyên đề đã tồn tại!');
        } else if (file === null) {
            alert('Bạn chưa tải ảnh lên!');
        } else {
            const data = new FormData();
            data.append("file", file);
            data.append("code", code);
            data.append("thematic", them);


            axios.post(process.env.REACT_APP_SERVER_URL + "thematics", data)
                .then(res => {
                    alert("Thêm thành công!");
                    navigate('/admin/2');
                    window.location.reload();
                })
                .catch(err => console.log(err))
        }

    }

    return (
        auth && auth.permission === "admin" ?
            (<div className="lg:mx-80 mx-24">
                <div className="sm:text-2xl text-lg text-teal-400 sm:font-bold font-semibold mb-6 text-center">
                    Thông tin chuyên đề mới
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <span className="text-slate-400">Tải hình ảnh lên </span>
                        <input className="ml-4 rounded-lg bg-emerald-400" type="file" name="file"
                            onChange={(e) => setFile(e.target.files[0])} />
                    </div>
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

            </div>
            ) : (
                <div className='text-orange-700 text-lg  sm:text-xl text-center'>
                    Bạn không thể truy cập vào trang web này!
                </div>
            )
    )
}

export default ThematicAdd;
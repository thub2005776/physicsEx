import { useLocation } from 'react-router';
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ThemEdit = ({ auth, thematics }) => {

    const navigate = useNavigate()
    const location = useLocation();
    const path = location.pathname.split('/')[4];

    const th = thematics && thematics.find((f) => f._id === path);
    const [file, setFile] = useState(null);
    const [code, setCode] = useState(th && th.code);
    const [them, setThem] = useState(th && th.thematic);
    const [img, setImg] = useState(th && th.img);
    const [uploaded, setUploaded] = useState(null);

    const HandleFileChange = (e) => {
        setFile(e.target.files[0]);
        setImg(e.target.files[0].name)
        const f = e.target.files[0]
        setUploaded(URL.createObjectURL(f));
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("file", file);

        const values = {
            'code': code,
            'thematic': them,
            'img': img
        }
        const subThematic = values.code;
        axios.post(process.env.REACT_APP_SERVER_URL + `exercises/update/many/${th._id}`, {subThematic})
            .then(res => {
                if(res.status === 200) {
                    console.log('updated');
                }
            })
            .catch(err => console.log(err))

        axios.post(process.env.REACT_APP_SERVER_URL + `thematics/${th._id}`, values)
            .then(res => {
                if (res.status === 200) {
                    alert("Cập nhật thành công!");
                    navigate('/admin/2');
                    window.location.reload();
                }

            })
            .catch(err => console.log(err))
    }

    return (
        auth && auth.permission === "admin" && th &&
        (<div className="lg:mx-80 mx-24">
            <div className="sm:text-2xl text-lg text-teal-400 sm:font-bold font-semibold mb-6 text-center">
                Thông tin chuyên đề
            </div>
            <form onSubmit={handleSubmit} className='p-4 bg-gray-800 border border-gray-600 rounded-md'>
                <div className="mb-6 text-base">
                    <span className="text-slate-400">Tải hình ảnh lên </span>
                    <input className="ml-4 rounded-lg bg-emerald-400" type="file" name="file"
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
                        className="bg-slate-700 border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        defaultValue={th.code}
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
                        className="bg-slate-700 border text-sm rounded-lg
                            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        defaultValue={th.thematic}
                        onChange={(e) => setThem(e.target.value)} />
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

export default ThemEdit;
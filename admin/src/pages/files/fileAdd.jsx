import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const FileAdd = ({ auth }) => {
    const [file, setFile] = useState(null);
    const [grade, setGrade] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("file", file);

        const values = {
            'name': file && file.name,
            'grade': grade
        }

        console.log(values);
        axios.post(process.env.REACT_APP_SERVER_URL + "file/upload", data)
            .then(res => {
                if(res.status === 200) {console.log(res.data)}
            })
            .catch(err => console.log(err))

        axios.post(process.env.REACT_APP_SERVER_URL + "docs", values)
            .then(res => {
                if (res.status === 200) {
                    alert("Thêm thành công!");
                    navigate('/admin/3');
                    window.location.reload();
                }

            })
            .catch(err => console.log(err))
    }

    return (
        auth && auth.permission === "admin" &&
            (<div className="lg:mx-80 mx-10 pt-5">
                <div className="lg:text-2xl text-lg text-teal-400 sm:font-bold font-semibold mb-6 text-center">
                    Thông tin tài liệu mới
                </div>
                <form onSubmit={handleSubmit} className='sm:mx-10 mx-5 p-4 bg-gray-800 border border-gray-600 rounded-md'>
                    <div className='sm:flex block'>
                        <div className="mb-6 flex-none mr-5">
                            <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-medium text-slate-400 ">
                                Lớp
                            </label>
                            <input type="text" id="name"
                                className="bg-slate-700 border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5"
                                placeholder='12...'
                                required
                                onChange={(e) => setGrade(e.target.value)}/>
                        </div>
                        <div className="mb-6 text-base">
                            <div className="text-slate-400 mb-2">Tải tài liệu lên (*.pdf) </div>
                            <input className=" rounded-lg bg-emerald-400" type="file" accept='application/pdf'
                            required
                                onChange={(e) => setFile(e.target.files[0])} />
                        </div>
                    </div>
                    <button type="submit" className="text-white bg-green-400 hover:bg-green-600 
                    focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
                    text-sm w-fit sm:w-auto px-5 py-2.5 text-center ">
                        Thêm
                    </button>
                </form>

            </div>)
    )
}

export default FileAdd;
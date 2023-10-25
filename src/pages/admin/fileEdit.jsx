import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const FileEdit = ({auth}) => {
    const [docs, setDocs] = useState();
    const location = useLocation();
    const path = location.pathname.split('/')[5];

    useEffect(() =>{
        axios.get(process.env.REACT_APP_SERVER_URL + "docs")
            .then(res => {
                setDocs(res.data);
            })
            .catch(err => console.log(err))
    }, []);

    // console.log(docs);
    const doc = docs?  docs.find((f) => f.name === path) : null;
    // console.log(doc);

    const [file, setFile] = useState(null);
    const [grade, setGrade] = useState(null);
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        if(file !== null) {
            data.append("file", file);
        } else {
            data.append("name", doc.name);
        }
        if(grade !== null) {
            data.append("grade", grade);
        } else {
            data.append("grade", doc.grade);
        }

        axios.post(process.env.REACT_APP_SERVER_URL + "edit/file", data)
            .then(res => {
                alert("Cập nhật thành công!");
                // console.log(res)
                navigate('/admin/3');
            })
            .catch(err => console.log(err))
    }
    return(
        auth && auth.permission === "admin" && docs?
        (<div className="lg:mx-80 mx-10">
        <div className="lg:text-2xl text-lg mt-4 text-teal-400 sm:font-bold font-semibold mb-6 text-center">
            Thông tin tài liệu
        </div>
        <form onSubmit={handleSubmit} className='sm:mx-10 mx-5'>
            
            <div className='sm:flex block'>
                
            <div className="mb-6 flex-none mr-5">
                <label
                    htmlFor="code"
                    className="block mb-2 text-sm font-medium text-slate-400 ">
                    Lớp
                </label>
                <input type="text" id="code"
                    className="bg-slate-700 border  text-gray-900 
                        text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5"
                    placeholder={doc.grade}
                    onChange={(e) => setGrade(e.target.value)}/>
            </div>
            <div className="mb-6">
                <div className="text-slate-400 mb-2">Tải tài liệu lên (*.pdf) </div>
                <input className=" rounded-lg bg-emerald-400" type="file" 
                onChange={(e) => setFile(e.target.files[0])}/>
            </div>
            </div>
            <button type="submit" className="text-white bg-green-400 hover:bg-green-600 
                focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
                text-sm w-fit sm:w-auto px-5 py-2.5 text-center ">
                Cập nhật
            </button>
        </form>

    </div>) :
    <div className='text-orange-700 text-lg  sm:text-xl text-center'>
        Bạn không thể truy cập vào trang web này!
    </div>
    )
}

export default FileEdit;
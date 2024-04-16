import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Delete } from "../components";

const EditProfile = ({ auth }) => {
    const navigate = useNavigate();
    const [del, setDel] = useState(false);
    const [loaded, setLoaded] = useState(-1);
    const [file, setFile] = useState(null);
    const [name, setName] = useState(auth?.name);
    const [email, setEmail] = useState(auth?.email);
    const [img, setImg] = useState(auth?.img);
    const [password, setPassword] = useState(auth?.password);
    const [uploaded, setUploaded] = useState(null);
    const [upload, setUpload] = useState(0);

    const HandleFileChange = (e) => {
        setFile(e.target.files[0]);
        setLoaded(1);
        const f = e.target.files[0]
        setUploaded(URL.createObjectURL(f));
        setImg(file.name);
    }

    const [formData, setFormData] = useState({
        password: '',
        comfirmPassword: ''
    })
    const [errors, setErrors] = useState({})
    const validationErrors = {}
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData, [name]: value
        })

        // Xác thực form 

        // if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(formData.email)) {
        //     validationErrors.email = "Email không hợp lệ"
        // }

        // if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(formData.password)) {
        //     validationErrors.password = "Mật khẩu phải có ít nhất 8 ký tự : HOA, thường và đặc biệt"
        // }

        if (formData.password.substring(0, formData.password.length - 1).localeCompare(formData.comfirmPassword.trim()) !== 0) {
            validationErrors.comfirmPassword = "Mật khẩu không khớp"
        }

        setErrors(validationErrors)
        setPassword(formData.password);
    }

    const HandleDetele = (e) => {
        axios.delete(process.env.REACT_APP_SERVER_URL + `users/${auth._id}`)
            .then(res => {
                if (res.status === 200) {
                    alert("Đã xóa!");
                navigate(-1);
                window.location.reload();
                }
            })
            .catch(err => console.log(err))

        axios.delete(process.env.REACT_APP_SERVER_URL + `comments/${auth._id}`)
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data);
                }
            })
            .catch(err => console.log(err))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (file) {
            const data = new FormData();
            data.append("file", file);

            axios.post(process.env.REACT_APP_SERVER_URL + "file/upload", data)
            .then(res => {
                if (res.status === 200) {
                    setUpload(200);
                }
            })
            .catch(err => console.log(err))
        }


        const values = {
            'img': file ? file.name : img,
            'name': name,
            'email': email,
            'password': password,
        }

        axios.post(process.env.REACT_APP_SERVER_URL + `users/${auth._id}`, values)
            .then(res => {
                if (res.status === 200 ) {
                    alert("Cập nhật thành công!");
                    window.location.reload(true);
                }
            })
            .catch(err => console.log(err));
    }
    return (
        auth &&
        <form onSubmit={handleSubmit} className='relative w-full'>
            <div className='sm:flex '>
                <div className="w-full">
                    <div className="relative mb-2">
                        <input type="file" hidden id={"fileUpLoad"}
                            onChange={HandleFileChange} />
                        <label htmlFor="fileUpLoad">
                            {uploaded ?
                                <img className="bg-slate-600 p-2 h-40  w-40 rounded-full mx-auto cursor-pointer"
                                    src={uploaded} alt={file.name} onClick={() => setLoaded(0)} />
                                : <img
                                    src={process.env.REACT_APP_SERVER_URL + auth.img} alt={auth.name}
                                    className={`bg-slate-600 p-2 h-40  w-40 rounded-full mx-auto cursor-pointer`}
                                    onClick={() => setLoaded(0)} />}
                        </label>
                        {loaded === 0 &&
                            <button disabled type="button" className="absolute top-16 left-3 py-2.5 px-5 me-2 text-sm font-medium  rounded-lg border  focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 bg-gray-800 text-gray-400 border-gray-600 hover:text-white hover:bg-gray-700 inline-flex items-center">
                                <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 animate-spin text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                                </svg>
                                Đang tải...
                            </button>}
                    </div>

                    {del &&
                        <div className="absolute top-0 right-32 z-50">
                            <Delete sendDelete={HandleDetele} />
                        </div>
                    }
                </div>
                <div className="sm:flex gap-5 w-full">
                    <div className="w-full">
                        <div className="mb-6">
                            <label htmlFor="name" className="font-normal  text-gray-400">
                                Tên tài khoản
                            </label>
                            <input type="text" id="name"
                                name='name'
                                className=" border border-gray-300 text-sm rounded-lg   
                                                block w-full p-2.5 bg-gray-700  placeholder-gray-400 
                                                text-white focus:ring-blue-500 focus:border-blue-500"
                                defaultValue={auth.name}
                                onChange={(e) => setName(e.target.value)} />
                            {errors.name && <span className="text-xs text-red-600 font-thin">{errors.name}</span>}
                        </div>

                        <div className="mb-6">
                            <label htmlFor="email" className="font-normal  text-gray-400">
                                Địa chỉ Email
                            </label>
                            <input type="email" id="email"
                                name='email'
                                className=" border border-gray-300 text-sm rounded-lg   
                                                block w-full p-2.5 bg-gray-700  placeholder-gray-400 text-white 
                                                focus:ring-blue-500 focus:border-blue-500"
                                defaultValue={auth.email}
                                onChange={(e) => setEmail(e.target.value)} />
                            {errors.email && <span className="text-xs text-red-600 font-thin">{errors.email}</span>}
                        </div>
                    </div>

                    <div className='w-full'>
                        <div className='mb-6'>
                            <label htmlFor="password" className="font-normal  text-gray-400">Mật khẩu mới</label>
                            <input type="password" id="password"
                                name='password'
                                className=" border border-gray-300 text-sm rounded-lg block w-full p-2.5 bg-gray-700  
                                            placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                onChange={handleChange} />
                            {errors.password && <span className="text-xs text-red-600 font-thin">{errors.password}</span>}
                        </div>


                        <div className='mb-6'>
                            <label htmlFor="comfirmpassword" className="font-normal  text-gray-400">Nhập lại mật khẩu</label>
                            <input type="password" id="comformpassword"
                                name='comfirmPassword'
                                className=" border border-gray-300 text-sm rounded-lg   block w-full p-2.5 bg-gray-700  
                                                placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                onChange={handleChange} />
                            {errors.comfirmPassword && <span className="text-xs text-red-600 font-thin">{errors.comfirmPassword}</span>}
                        </div>

                    </div>

                </div>
            </div>
            <div className="flex justify-end gap-5">
                <button type="submit"
                    className=" px-4 text-white  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm  text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">
                    Cập nhật
                </button>
                <div
                    className="p-2 hover:cursor-pointer inline-flex items-center justify-center overflow-hidden text-sm font-medium  rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white text-white focus:ring-4 focus:outline-none focus:ring-pink-800"
                    onClick={() => setDel(true)}>
                    Xóa tài khoản
                </div>
            </div>

        </form>
    )
}

export default EditProfile;
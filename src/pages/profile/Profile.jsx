import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Profile = ({ auth }) => {
    const [looked, setLooked] = useState(false);
    const [edit, setEdit] = useState(false);

    const [file, setFile] = useState(null);
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [comfirm, setComfirm] = useState(null);
    const [admin, setAdmin] = useState(false);
    const [error, setError] = useState();

    const [info, setInfo] = useState([]);
    const location = useLocation();
    const uid = location.pathname.split('/')[2]
    // console.log(uid);

    useEffect(() => {
        axios.post(process.env.REACT_APP_SERVER_URL + 'profile/find', { uid })
            .then(res => {
                setInfo(res.data);
                // console.log(res.data);
            })
            .catch(err => console.log(err))
    }, []);

    // console.log(info);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Post data 
            if ((comfirm === null && password === null) || (comfirm.trim() === password.trim())) {
                const data = new FormData();
                if (file !== null) {
                    data.append("file", file);
                } else {
                    data.append("img", info.img);
                }
                if (name !== null) {
                    data.append("name", name);
                } else {
                    data.append("name", info.name);
                }
                if (email !== null) {
                    data.append("email", email);
                } else {
                    data.append("email", info.email);
                }
                if (password !== null) {
                    data.append("password", password);
                    data.append("old", false);
                } else {
                    data.append("password", info.password);
                    data.append("old", true);
                }

                if (admin) {
                    data.append("permission", 'admin');
                } else {
                    data.append("permission", 'user');
                }

                data.append("uid", info.uid);
                console.log(data);
                axios.post(process.env.REACT_APP_SERVER_URL + 'edit/user', data)
                    .then(res => {
                        alert("Cập nhật thành công!");
                        window.location.reload(true);
                    })
                    .catch(err => console.log(err));
            } else {
                setError("Mật khẩu không khớp")
            }

    }
    return (
        info && auth ?
            (<div className='mt-5'>
                <div className='sm:text-2xl text-lg sm:font-bold text-green-600 text-center mb-6'>
                    Thông tin tài khoản
                </div>
                <div className=" lg:mx-60 p-6 mx-10  border  rounded-lg shadow  bg-gray-800 border-gray-700  md:flex block relative">
                    <div className={`absolute top-1 right-1 text-white cursor-pointer hover:bg-slate-900 p-1  rounded-md ${edit ? "bg-slate-900" : "bg-slate-50000"}`}
                        onClick={() => setEdit(!edit)}>
                        <svg className="w-6 h-6 text-white"
                            aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm-1.391 7.361.707-3.535a3 3 0 0 1 .82-1.533L7.929 
                                    10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h4.259a2.975 2.975 0 0 1-.15-1.639ZM8.05 17.95a1 1 0 0 
                                    1-.981-1.2l.708-3.536a1 1 0 0 1 .274-.511l6.363-6.364a3.007 3.007 0 0 1 4.243 0 3.007 3.007 0 0 
                                    1 0 4.243l-6.365 6.363a1 1 0 0 1-.511.274l-3.536.708a1.07 1.07 0 0 1-.195.023Z" />
                        </svg>
                    </div>

                    <div className='relative'>
                        <input type="file" hidden id={edit ? "fileUpLoad" : ""}
                            onChange={(e) => {
                                setFile(e.target.files[0]);
                            }} />
                        <label htmlFor="fileUpLoad">
                            <img
                                src={process.env.REACT_APP_SERVER_URL + info.img} alt={info.name}
                                className={`md:mr-10 bg-slate-600 p-2 h-40  sm:ml-0 ml-10 w-40 rounded-full
                                    ${edit ? "cursor-pointer" : ""}`} />
                        </label>

                    </div>
                    {!edit ?
                        (<div className='sm:border-l-2 pl-10'>
                            <div className='mb-6'>
                                <p className="font-normal  text-gray-400">Tên tài khoản</p>
                                <h5 className="mb-2 sm:text-2xl text-md font-bold text-white">{info.name}</h5>
                            </div>
                            <div className='mb-6'>
                                <p className="sm:font-normal text-gray-400">Địa chỉ Email</p>
                                <h5 className="mb-2 sm:text-2xl text-md font-bold text-white">{info.email}</h5>
                            </div>
                            
                        </div>
                        ) :
                        (<form onSubmit={handleSubmit} className='lg:border-l-2 pl-10'>
                            <div className='sm:flex'>
                                <div className='mr-10'>
                                    <div className="mb-6">
                                        <label htmlFor="name" className="font-normal  text-gray-400">Tên tài khoản</label>
                                        <input type="text" id="name"
                                            name='name'
                                            className=" border border-gray-300 text-sm rounded-lg   
                                                block w-full p-2.5 bg-gray-700  placeholder-gray-400 
                                                text-white focus:ring-blue-500 focus:border-blue-500"
                                            placeholder={info.name}
                                            onChange={(e) => setName(e.target.value)} />
                                    </div>
                                   
                                    <div className="mb-6">
                                        <label htmlFor="email" className="font-normal  text-gray-400">Địa chỉ Email</label>
                                        <input type="email" id="email"
                                            name='email'
                                            className=" border border-gray-300 text-sm rounded-lg   
                                                block w-full p-2.5 bg-gray-700  placeholder-gray-400 text-white 
                                                focus:ring-blue-500 focus:border-blue-500"
                                            placeholder={info.email}
                                            onChange={(e) => setEmail(e.target.value)} />
                                    </div>

                                </div>

                                <div className='mr-10 sm:mr-0'>
                                    <div className='mb-6'>
                                        <label htmlFor="password" className="font-normal  text-gray-400">Mật khẩu mới</label>
                                        <input type="password" id="password"
                                            name='password'
                                            className=" border border-gray-300 text-sm rounded-lg block w-full p-2.5 bg-gray-700  
                                            placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                            onChange={(e) => setPassword(e.target.value)} />
                                    </div>

                                    <div className='mb-6'>
                                        <label htmlFor="comfirmpassword" className="font-normal  text-gray-400">Nhập lại mật khẩu</label>
                                        <input type="password" id="comformpassword"
                                            name='comfirmPassword'
                                            className=" border border-gray-300 text-sm rounded-lg   block w-full p-2.5 bg-gray-700  
                                                placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                            onChange={(e) => setComfirm(e.target.value)} />
                                    </div>
                                    {error ?
                                        <div className='text-xs text-red-500 font-thin'>{error}</div> : null
                                    }
                                </div>

                            </div>

                            {auth.permission === 'admin'?
                                (<div className={`text-sm mb-3 ${admin ? "text-green-400" : "text-gray-600"}`}>
                                    <input type="checkbox"
                                        onChange={(e) => setAdmin(e.target.checked)} /> Admin
                                </div>
                                ):null}

                            <button type="submit"
                                className="text-white  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm 
                                            w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">
                                Cập nhật
                            </button>
                        </form>
                        )}
                </div>
            </div>
            ) : (<div className='text-orange-700 text-lg  sm:text-xl text-center'>
                Bạn phải đăng nhập trước!
            </div>)

    )
};

export default Profile;

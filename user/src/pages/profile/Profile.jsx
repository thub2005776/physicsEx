import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { Delete } from '../../components';
import { useNavigate } from 'react-router-dom';

const Profile = ({ auth }) => {
    const [edit, setEdit] = useState(false);
    const [file, setFile] = useState(null);
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [comfirm, setComfirm] = useState(null);
    const [error, setError] = useState();
    const [del, setDel] = useState(false);
    const [loaded, setLoaded] = useState(-1);

    const [info, setInfo] = useState([]);
    const location = useLocation();
    const uid = location.pathname.split('/')[2];
    const navigate = useNavigate();

    useEffect(() => {
        axios.post(process.env.REACT_APP_SERVER_URL + 'profile/find', { uid })
            .then(res => {
                setInfo(res.data);
            })
            .catch(err => console.log(err))
    }, []);

    const Comment = ({ comment }) => {
        return (
            <Link to={`/detail/${comment.eid}`}>
                <div className='block p-1 w-full text-sm   
            placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'>
                    <b>{comment.time.toString().slice(0, 10)}</b>: {comment.content}
                </div>
            </Link>

        )
    }
    const [img, setImg] = useState();
    const HandleDetele = (e) => {
        axios.post(process.env.REACT_APP_SERVER_URL + "del/user", { uid, img })
            .then(res => {
                alert("Đã xóa!");
                navigate('/');
                window.location.reload(true);
            })
            .catch(err => console.log(err))

        axios.post(process.env.REACT_APP_SERVER_URL + "del/comm", { uid })
            .then()
            .catch(err => console.log(err))
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        // Post data 
        if ((comfirm === null && password === null) || (comfirm.trim() === password.trim())) {
            const data = new FormData();
            data.append("file", file);
            data.append("img", info.img);
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

            data.append("permission", 'user');

            data.append("uid", info.uid);
            axios.post(process.env.REACT_APP_SERVER_URL + 'edit/user', data)
                .then(res => {
                    alert("Cập nhật thành công!");
                    window.location.reload(true);
                })
                .catch(err => console.log(err));
            axios.post(process.env.REACT_APP_SERVER_URL + 'edit/uimg', info)
                .then()
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
                    {del &&
                        <div className="absolute top-0 right-32 z-50">
                            <Delete sendDelete={HandleDetele} />
                        </div>
                    }
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
                                setLoaded(1);
                            }} />
                        <label htmlFor="fileUpLoad">
                            <img
                                src={process.env.REACT_APP_SERVER_URL + info.img} alt={info.name}
                                className={`md:mr-10 bg-slate-600 p-2 h-40  sm:ml-0  w-40 rounded-full mx-32 
                                    ${edit ? "cursor-pointer" : ""}`} onClick={() => setLoaded(0)} />
                        </label>
                        {loaded === 0 &&
                            <button disabled type="button" className="absolute top-16 sm:right-12 right-32 py-2.5 px-5 me-2 text-sm font-medium  rounded-lg border  focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 bg-gray-800 text-gray-400 border-gray-600 hover:text-white hover:bg-gray-700 inline-flex items-center">
                                <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 animate-spin text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                                </svg>
                                Đang tải...
                            </button>
                        }

                        <button
                            className="sm:mt-10 sm:ml-5 mt-5 ml-32 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 
                                overflow-hidden text-sm font-medium  rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 
                                group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white text-white focus:ring-4 focus:outline-none focus:ring-pink-800"
                            onClick={() => {
                                setDel(true)
                                setImg(info.img)
                            }}>
                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75  bg-gray-800 rounded-md group-hover:bg-opacity-0">
                                Xóa tài khoản
                            </span>
                        </button>

                    </div>
                    {!edit ?
                        (<div className='sm:border-l-2 pl-10'>
                            <div className='mb-6'>
                                <p className="font-normal text-gray-400">Tên tài khoản</p>
                                <h5 className="mb-2 sm:text-2xl text-md font-bold text-white">{info.name}</h5>
                            </div>
                            <div className='mb-6'>
                                <p className="sm:font-normal text-gray-400">Địa chỉ Email</p>
                                <h5 className="mb-2 sm:text-2xl text-md font-bold text-white">{info.email}</h5>
                            </div>
                            <div className='mb-6'>
                                <p className="sm:font-normal text-gray-400">Bình luận của bạn ({info.comments && Array.isArray(info.comments) && info.comments.length})</p>
                                <div className='rounded-lg border bg-gray-700 border-gray-600'>
                                    {info.comments && info.comments.map((com, i) => (
                                        <Comment key={i} comment={com} />
                                    ))}
                                </div>

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

                            <button type="submit"
                                className="text-white  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm 
                                            w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">
                                Cập nhật
                            </button>
                        </form>
                        )}
                </div>
            </div>
            ) : (
                <div className='text-orange-700 text-lg  sm:text-xl text-center'>
                    Bạn phải đăng nhập trước!
                </div>)
    )
};

export default Profile;

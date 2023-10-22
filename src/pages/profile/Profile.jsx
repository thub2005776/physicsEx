import React from 'react';
import { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible, AiFillCamera } from "react-icons/ai";

const Profile = ({ auth }) => {
    const [looked, setLooked] = useState(false);
    const [edit, setEdit] = useState(false);

    return (
        auth ?
            (
                <div className='mt-5'>
                    <div className='sm:text-2xl text-lg sm:font-bold text-green-600 text-center mb-6'>Thông tin tài khoản</div>

                    <div className=" sm:mx-60 p-6 mx-5  border  rounded-lg shadow  bg-gray-800 border-gray-700  md:flex block relative">
                        <div className={`absolute right-5 text-white cursor-pointer hover:bg-slate-900 p-1 bg-slate-700 rounded-md ${edit? "bg-slate-900":null}`}
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
                        <input type="file" hidden id={edit? "fileUpLoad" : false}/>
                                <label htmlFor="fileUpLoad">
                                    <img
                                src={process.env.REACT_APP_SERVER_URL + auth.img} alt={auth.name}
                                className={`md:mr-10 bg-slate-600 p-2 rounded-lg sm:ml-0 ml-10 
                                    ${edit ? "cursor-pointer" : null}`} />
                                </label>
                            
                            {edit ?
                                <>
                                 <div className='absolute text-slate-800 hover:text-black top-[6.5rem] right-10'>
                                    <AiFillCamera size={25} className='' />
                                </div>
                                </>
                                : null}
                        </div>
                        {!edit ?
                            (<div className='sm:border-l-2 pl-10'>
                                <div className='mb-6'>
                                    <p className="font-normal  text-gray-400">Tên tài khoản</p>
                                    <h5 className="mb-2 text-2xl font-bold text-white">{auth.name}</h5>
                                </div>
                                <div className='mb-6'>
                                    <p className="font-normal  text-gray-400">Địa chỉ Email</p>
                                    <h5 className="mb-2 text-2xl font-bold text-white">{auth.email}</h5>
                                </div>
                                <div className=''>
                                    <p className="font-normal  text-gray-400">Mật khẩu</p>
                                    <div className='flex'>
                                        <h5 className="mb-2 text-2xl font-bold text-white">{looked ? auth.password : "***********"}</h5>
                                        <div className='text-white mt-2 ml-4'
                                            onClick={() => setLooked(!looked)}>
                                            {looked ?
                                                <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
                                        </div>

                                    </div>

                                </div>
                            </div>
                            ) :
                            (<form className='sm:border-l-2 pl-10'>
                                <div className='flex'>
                                    <div className='mr-10'>
                                        <div class="mb-6">
                                            <label htmlFor="name" className="font-normal  text-gray-400">Tên tài khoản</label>
                                            <input type="text" id="name"
                                                className=" border border-gray-300 text-sm rounded-lg   
                                                block w-full p-2.5 bg-gray-700  placeholder-gray-400 
                                                text-white focus:ring-blue-500 focus:border-blue-500"
                                                placeholder={auth.name} required />
                                        </div>
                                        <div class="mb-6">
                                            <label htmlFor="email" className="font-normal  text-gray-400">Địa chỉ Email</label>
                                            <input type="email" id="email"
                                                className=" border border-gray-300 text-sm rounded-lg   
                                                block w-full p-2.5 bg-gray-700  placeholder-gray-400 text-white 
                                                focus:ring-blue-500 focus:border-blue-500"
                                                placeholder={auth.email}
                                                required />
                                        </div>
                                    </div>

                                    <div>
                                        <div className='mb-6'>
                                            <label htmlFor="password" className="font-normal  text-gray-400">Mật khẩu mới</label>
                                            <input type="password" id="password"
                                                className=" border border-gray-300 text-sm rounded-lg   block w-full p-2.5 bg-gray-700  
                                            placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                                required />
                                        </div>
                                        <div className='mb-6'>
                                            <label htmlFor="resetpassword" className="font-normal  text-gray-400">Nhập lại mật khẩu</label>
                                            <input type="password" id="resetpassword"
                                                className=" border border-gray-300 text-sm rounded-lg   block w-full p-2.5 bg-gray-700  
                                            placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                                required />
                                        </div>
                                    </div>
                                </div>



                                <button type="submit"
                                    className="text-white  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm 
                                            w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">
                                    Sửa
                                </button>
                            </form>

                            )}


                    </div>
                </div>
            ) : <div className='mb-2 text-2xl font-bold tracking-tight text-white text-center'>Bạn phải đăng nhập trước</div>
    )
};

export default Profile;

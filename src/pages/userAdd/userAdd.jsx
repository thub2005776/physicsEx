import { useState, useEffect } from "react";
import axios from "axios";

const UserForm = ({ auth }) => {
    const [profile, setProfile] = useState([]);
    useEffect(() => {
        axios.post(process.env.REACT_APP_SERVER_URL + 'profile')
            .then(res => {
                setProfile(res.data);
                // console.log(res.data);
            })
            .catch(err => console.log(err))
    }, []);

    const info = profile.find((p) => p.email === auth);
    return (
        info && info.permission === "admin" ?
            (<div className="sm:mx-80 mx-5">
                <div className="sm:text-2xl text-lg text-teal-400 sm:font-bold font-semibold mb-6 text-center">
                    Thông tin tài khoản mới
                </div>
                <form>
                    <div className="relative z-0 w-full mb-6 group text-white">
                        <span>Tải hình ảnh lên </span>
                        <input className="ml-4 rounded-lg bg-emerald-400" type="file" />
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input
                            type="text"
                            name="floating_name"
                            id="floating_name"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent 
                                border-0 border-b-2 border-gray-300 appearance-none dark:text-white 
                                dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0
                                focus:border-blue-600 peer"
                            placeholder=" "
                            required />
                        <label
                            htmlFor="floating_name"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 
                                    dark:text-gray-400 duration-300 transform -translate-y-6 
                                    scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 
                                    peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
                                    peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                                    peer-focus:scale-75 peer-focus:-translate-y-6">
                            Tên người dùng
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input
                            type="email"
                            name="floating_email"
                            id="floating_email"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent 
                                border-0 border-b-2 border-gray-300 appearance-none dark:text-white 
                                dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0
                                focus:border-blue-600 peer"
                            placeholder=" "
                            required />
                        <label
                            htmlFor="floating_email"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 
                                    dark:text-gray-400 duration-300 transform -translate-y-6 
                                    scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 
                                    peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
                                    peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                                    peer-focus:scale-75 peer-focus:-translate-y-6">
                            Email
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input
                            type="password"
                            name="floating_password"
                            id="floating_password"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent 
                                border-0 border-b-2 border-gray-300 appearance-none dark:text-white 
                                dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 
                                focus:border-blue-600 peer"
                            placeholder=" "
                            required />
                        <label
                            htmlFor="floating_password"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 
                            dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 
                            -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 
                            peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 
                            peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Mật khẩu
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input
                            type="password"
                            name="repeat_password"
                            id="floating_repeat_password"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent 
                                border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none 
                                focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required />
                        <label
                            htmlFor="floating_repeat_password"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 
                            dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 
                            -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 
                            peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 
                            peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Nhập lại mật khẩu
                        </label>
                    </div>
                    <div class="flex items-center mb-4 text-">
                        <input 
                            id="checkbox-2" 
                            type="checkbox" 
                            value="" 
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded " />
                        <label 
                            htmlFor="checkbox-2" 
                            class="ml-2 text-sm text-gray-600">
                                Admin
                            </label>
                    </div>
                    <button
                        type="submit"
                        className="text-white bg-green-400 hover:bg-green-600 focus:ring-4 
                            focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm 
                            w-full sm:w-auto px-5 py-2.5 text-center">
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

export default UserForm;
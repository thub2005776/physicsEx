import { useState, useEffect } from "react";
import axios from "axios";

const ThematicAdd = ({ auth }) => {
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
                    Thông tin chuyên đề mới
                </div>
                <form>
                    <div className="mb-6">
                        <span className="text-white">Tải hình ảnh lên </span>
                        <input className="ml-4 rounded-lg bg-emerald-400" type="file" />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="code"
                            className="block mb-2 text-sm font-medium text-slate-400 ">
                            Mã chuyên đề
                        </label>
                        <input type="text" id="code"
                            className="bg-slate-700 border  text-gray-900 
            text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="1201"
                            required />
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
                            className="bg-slate-700 border  text-gray-900 text-sm rounded-lg
             focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            required />
                    </div>

                    <button type="submit" className="text-white bg-green-400 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">
                        Thêm
                    </button>
                </form>

            </div>
            ) : (
                <div classNameName='text-orange-700 text-lg  sm:text-xl text-center'>
                    Bạn không thể truy cập vào trang web này!
                </div>
            )

    )
}

export default ThematicAdd;
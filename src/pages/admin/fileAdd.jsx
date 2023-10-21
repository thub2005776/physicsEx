import { useLocation } from 'react-router';

const FileAdd = ({ auth }) => {
    const location = useLocation();
    const path = location.pathname.split('/')[4];

    return (
        auth && auth.permission === "admin" ?
            (<div className="sm:mx-80 mx-5">
            <div className="sm:text-2xl text-lg text-teal-400 sm:font-bold font-semibold mb-6 text-center">
                Thông tin tài liệu mới
            </div>
            <form className=''>
                <div className="mb-6">
                    <span className="text-slate-400">Tải tài liệu lên (*.pdf) </span>
                    <input className="ml-4 rounded-lg bg-emerald-400" type="file" />
                </div>
                <div className='flex'>
                <div className="mb-6 flex-none mr-5">
                    <label
                        htmlFor="code"
                        className="block mb-2 text-sm font-medium text-slate-400 ">
                        Mã chuyên đề
                    </label>
                    <input type="text" id="code"
                        className="bg-slate-700 border  text-gray-900 
                            text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        value={path}
                        required />
                </div>
                <div className="mb-6 w-full">
                    <label
                        htmlFor="thematic"
                        className="block mb-2 text-sm font-medium text-slate-400 ">
                        Tên tài liệu
                    </label>
                    <input
                        type="thematic"
                        id="thematic"
                        className="bg-slate-700 border  text-gray-900 text-sm rounded-lg
                        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        required />
                </div>
                </div>
                <button type="submit" className="text-white bg-green-400 hover:bg-green-600 
                    focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
                    text-sm w-fit sm:w-auto px-5 py-2.5 text-center ">
                    Thêm
                </button>
            </form>

        </div>) :
        <div className='text-orange-700 text-lg  sm:text-xl text-center'>
            Bạn không thể truy cập vào trang web này!
        </div>
    )
}

export default FileAdd;
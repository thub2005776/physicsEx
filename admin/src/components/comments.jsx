import { useState } from "react";
import { CommItem, FilterComm } from '../components';

const Comments = ({ auth, user, comm }) => {
    const [filterCom, setFilterCom] = useState('comm');
    const [active, setActive] = useState(true);


    return (
        <>
            <div className='my-5 text-sm  sm:text-xl font-bold text-center'>Bình luận mới nhất</div>
            <div className="w-full">
                <ul className="items-center w-full text-sm font-medium   border  rounded-t-lg sm:flex bg-gray-700 border-gray-600 text-white">
                    <li className="w-full border-b  sm:border-b-0 sm:border-r border-gray-600">
                        <div className="flex items-center ps-3">
                            <input id="horizontal-list-radio-license" type="radio" value="" name="list-radio" className="w-4 h-4   ring-offset-gray-700 focus:ring-offset-gray-700 focus:ring-2 bg-gray-600 border-gray-500"
                                onChange={() => {
                                    setFilterCom('comm')
                                    setActive(true)
                                }} checked={active} />
                            <label htmlFor="horizontal-list-radio-license" className="w-full py-3 ms-2 text-sm font-medium  text-gray-300">Bình luận</label>
                        </div>
                    </li>
                    <li className="w-full border-b  sm:border-b-0 sm:border-r border-gray-600">
                        <div className="flex items-center ps-3">
                            <input id="horizontal-list-radio-id" type="radio" value="" name="list-radio" className="w-4 h-4   ring-offset-gray-700 focus:ring-offset-gray-700 focus:ring-2 bg-gray-600 border-gray-500"
                                onChange={() => {
                                    setFilterCom('user')
                                    setActive(false)
                                }} />
                            <label htmlFor="horizontal-list-radio-id" className="w-full py-3 ms-2 text-sm font-medium  text-gray-300">Người dùng</label>
                        </div>
                    </li>
                    <li className="w-full border-b  sm:border-b-0 sm:border-r border-gray-600">
                        <div className="flex items-center ps-3">
                            <input id="horizontal-list-radio-military" type="radio" value="" name="list-radio" className="w-4 h-4   ring-offset-gray-700 focus:ring-offset-gray-700 focus:ring-2 bg-gray-600 border-gray-500"
                                onChange={() => {
                                    setFilterCom('exe')
                                    setActive(false)
                                }} />
                            <label htmlFor="horizontal-list-radio-military" className="w-full py-3 ms-2 text-sm font-medium  text-gray-300">Bài tập</label>
                        </div>
                    </li>
                </ul>

                {/* Comments */}
                <div className="relative  w-full p-4  mb-3 border  rounded-b-lg shadow sm:p-8 bg-gray-800 border-gray-700">
                    <div className="flow-root">
                        <div role="list" className=" divide-y  divide-gray-700">
                            {filterCom === 'comm' && comm && comm.map((c, i) => (
                                <CommItem key={i} auth={auth} com={c} />
                            ))}

                            {filterCom === 'user' &&
                                user && user.map((u,i) => (
                                     <FilterComm key={i} auth={auth} user={u} />
                                )) }

                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Comments;
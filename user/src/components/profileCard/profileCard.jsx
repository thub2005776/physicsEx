import { Link } from 'react-router-dom';
import { useState } from 'react';
import { AiOutlineInfoCircle, AiOutlineLogout } from "react-icons/ai";

const ProfileCard = ({auth, handlelogout, state}) => {
    const [profile, setProfile] = useState(true);
    return(
        <div className="absolute right-5 top-8 z-[120] sm:w-52 w-32">
             <div className="w-full border rounded-lg shadow bg-gray-800 border-gray-500">
            {profile && 
            <button type="button" className="absolute text-gray-400 bg-transparent  rounded-lg text-sm right-0 mt-1 p-2  hover:bg-gray-600 hover:text-white" data-modal-hide="default-modal"
                    onClick={() => {setProfile(false)
                    state(false)}}>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                </button>
            }
             
                <div className="flex flex-col items-center pb-10 mt-5">
                    <img className="sm:w-24 w-10 sm:h-24 mb-3 rounded-full shadow-lg" 
                    src={process.env.REACT_APP_SERVER_URL + auth.img} alt="" />
                    <h5 className="mb-1 text-xl font-medium  text-white">{auth.name}</h5>
                    <span className="text-sm  text-gray-400">{auth.email}</span>
                    
                </div>
                <div className="flex justify-end px-4 mb-3">
                    <div id="dropdown" className="z-10  text-base list-none  divide-y divide-gray-100 rounded-lg shadow w-44 bg-gray-700">
                        <ul className="py-2" aria-labelledby="dropdownButton">
                            <li>
                                <Link to={`/profile/${auth.uid}`} 
                                    className="flex gap-2 px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white">
                                    <AiOutlineInfoCircle className='mt-1'/> Thông tin
                                </Link>
                            </li>
                            <li>
                                <div className="flex gap-2 cursor-pointer px-4 py-2 text-sm  hover:bg-gray-600 text-gray-200 hover:text-white"
                                    onClick={handlelogout}>
                                    <AiOutlineLogout className='mt-1'/> Đăng xuất</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileCard;
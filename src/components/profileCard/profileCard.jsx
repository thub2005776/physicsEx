import Image from '../../assets/Image.png'
const ProfileCard = ({auth}) => {
    return(
        <div className="fixed right-5 top-24 z-50 sm:w-52 w-32">
             <div className="w-full border rounded-lg shadow bg-gray-800 border-gray-500">
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
                                <a href="#" className="block px-4 py-2 text-sm   hover:bg-gray-600 text-gray-200 hover:text-white">Thông tin</a>
                            </li>
                            <li>
                                <a href="#" className="block px-4 py-2 text-sm   hover:bg-gray-600 text-gray-200 hover:text-white">Đánh giá</a>
                            </li>
                            <li>
                                <a href="#" className="block px-4 py-2 text-sm  hover:bg-gray-600 text-gray-200 hover:text-white">Đăng xuất</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileCard;
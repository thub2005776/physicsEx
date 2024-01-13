import { useState } from "react";

const Delete = (props) => {
    const [exit, setExit] = useState(false);

    const sendStatus = () => {
        props.sendDelete(true);
        setExit(true);
    }

    const sendExit = () => {
        props.Exit(true);
        setExit(true);
    }

    return (
        !exit &&
             <div
            id="popup-modal"
            className=" top-10 left-0 right-0 p-4  md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative w-full max-h-full">
                <div className="relative rounded-lg shadow bg-gray-700">
                    <button type="button"
                        className="absolute top-3 right-2.5 text-gray-400 bg-transparent  rounded-lg text-sm w-8 h-8 
                            ml-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white" 
                            onClick={sendExit}>
                        <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="p-6 text-center">
                        <svg className="mx-auto mb-4  w-12 h-12 text-gray-200"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <h3 className="mb-5 text-lg font-normal  text-gray-400">
                            Bạn chắc chắn muốn xóa?
                        </h3>
                        <button type="button"
                            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none 
                                 focus:ring-red-800 font-medium rounded-lg text-sm inline-flex 
                                items-center px-5 py-2.5 text-center mr-2"
                            onClick={sendStatus}>
                            Xóa
                        </button>
                        <button type="button"
                            className=" focus:ring-4 focus:outline-none  rounded-lg border  text-sm font-medium px-5 py-2.5  
                                focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600"
                            onClick={sendExit}>
                            Hủy
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Delete;
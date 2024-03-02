import { useState } from "react";
import CourseItem from "./cardItem";

const Search = ({ data, name, closed }) => {
    const [input, setInput] = useState('');
    const [close, setClose] = useState(false);
    const [result, setResult] = useState(data);

    const HandleClosed = () => {
        setClose(true);
        closed(true);
    }

    const handleKeyUp = (e) => {
        e.preventDefault();
        // var result = [];
        if (name === 'courses') {
            setResult(data.filter(f => f.name.toLowerCase().includes(input.toLowerCase())))


            if (result.length === 0) {
                setResult(data.filter(f => f.grade.toLowerCase().includes(input.toLowerCase())))
            } else {
                setResult(data.filter(f => f.level.toLowerCase().includes(input.toLowerCase())))
            }

        }
    }

    return (
        !close &&
        <div id="default-modal" tabIndex="-1" aria-hidden="true" className="absolute z-[5000] top-0 right-0 left-0   justify-center items-center w-full  h-[calc(100%-1rem)] max-h-full">
            <div className="relative lg:left-[15%]  p-4 w-full max-w-2xl max-h-full">
                <div className="relative  rounded-lg shadow bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600">
                        <form className="flex-1">
                            <label htmlFor="simple-search" className="sr-only">Search</label>
                            <div className="flex gap-1">
                                <input type="text" id="simple-search"
                                    className="border text-sm rounded-lg block w-full ps-10 p-2.5  bg-gray-800 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Vật lý 12..."
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyUp={handleKeyUp} />
                            </div>
                        </form>
                        <button type="button" className="text-gray-400 bg-transparent  rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white" data-modal-hide="default-modal"
                            onClick={HandleClosed}>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-4 md:p-5 space-y-4">
                        {result && result.length > 0 ? result.map((c, i) => (
                            <CourseItem key={i} course={c} />
                        )): <p className='mt-2 text-white text-center text-base'>Không có khóa học nào</p>}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Search;
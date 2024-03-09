import { useState } from "react";
import YoutubePlayer from "./youtubePlayer";


const LessionItem = ({ auth, lession }) => {
    const [isvable, setIsvisable] = useState(false);

    const handleClick = () => {
        setIsvisable(!isvable);
    }
    return (
        lession &&
        <div className="relative p-4 bg-gray-800 border border-gray-600 rounded-md hover:bg-gray-700 mb-[0.5px]">
            <div className="flex justify-between hover:cursor-pointer"
                onClick={handleClick}>
                <p className="font-bold">{lession.name}</p>
                <div className="flex gap-4 text-gray-400">
                    <p><span className="text-blue-500 font-semibold">{lession.duration}</span> phút</p>
                    <p><span className="text-green-500 font-semibold">{lession.view}</span> lượt xem</p>
                </div>
            </div>
            {isvable &&
                <div className="absolute z-[100] -top-[20rem] lg:left-[28%] left-[18%] p-2 bg-gray-900 border border-gray-600 rounded-md">
                    <YoutubePlayer videoId={lession.link} />
                </div>}
        </div>
    )
}

export default LessionItem;
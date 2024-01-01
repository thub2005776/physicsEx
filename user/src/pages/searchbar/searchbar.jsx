
import { useState } from "react";
import { Link } from "react-router-dom";
import "../../components/bids/bids.css";
import { CardThematic, CountLike } from "../../components";
import Latex from "react-latex";

function SearchBar({ thematic, exercise }) {
    const [input, setInput] = useState('');
    const [result, setResult] = useState(null);

    const like = CountLike(thematic, exercise);
    const liked = new Array([...like.entries()])
    const most = liked[0]

    const handleChange = (e) => {
        setInput(e.target.value);

    }

    const handleKeyUp = () => {
        const them = thematic.filter(f => f.code !== undefined && f.code.includes(input));
        const namethem = thematic.filter(f => f.thematic !== undefined && f.thematic.includes(input));
        const ex = exercise.filter(f => f.question !== undefined && f.question.includes(input));
        setResult(them.length ? them :
            (namethem.length ? namethem :
                (ex.length ? ex : "Không tìm thấy")))
    }

    const Item = ({ item }) => {
        return (
            item.thematic ? (
                <CardThematic
                    thematic={item}
                    like={most}
                />

            ) : (<Link to={`/detail/` + item.no}>
                <div className="text-white text-lg font-bold hover:text-green-500 truncate">
                    <Latex>{item.question}</Latex>
                </div>
            </Link>)
        )
    };

    return (
        thematic && exercise &&
        <div>
            <form className="lg:mx-52 mx-10">
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="search" id="default-search" 
                        className="block w-full p-4 ps-10 text-sm  border  rounded-lg  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" 
                        placeholder="Nhập 12, 11,...,tên chuyên đề, bài tâp"
                    onChange={handleChange}
                    onKeyUp={handleKeyUp}/>
                </div>
            </form>

            
            <div className="pt-5  text-white mt-20">
                <p className="text-white text-2xl border-b ml-16 mb-3">Kết quả tìm kiếm</p>
                <div className="flex justify-center">
                    {result ? (
                        <div className="bg-slate-700 p-3 w-5/6 rounded-md ">
                            <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
                                {Array.isArray(result) ? result.map((item, index) => (
                                    <Item
                                        key={index}
                                        item={item}
                                    />
                                )) : <Item item={result} />
                                }
                            </div>
                        </div>
                    ) :
                        <div className="bg-slate-700 p-20 w-5/6 rounded-md "></div>}
                </div>
            </div>
        </div>

    )
}

export default SearchBar;
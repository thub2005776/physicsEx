import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../components/bids/bids.css";
import {CardThematic, CountLike }from "../../components";
import Latex from "react-latex";

function SearchBar() {
    const [input, setInput] = useState('');
    const [result, setResult] = useState(null);
    const [exercise, setExercise] = useState([]);
    const [thematic, setThematic] = useState([]);

    useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER_URL + "exercises")
            .then(res => setExercise(res.data))
            .catch(err => console.log(err));

        axios.get(process.env.REACT_APP_SERVER_URL + "thematics")
            .then(res => setThematic(res.data))
            .catch(err => console.log(err));
    }, []);

    const like = CountLike();
    const liked = new Array([...like.entries()])
    const most = liked[0]
    // console.log(most);

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
        // console.log(result);
    }

    const Item = ({ item }) => {
        return (
            item.thematic ? (
                <CardThematic
                    thematic={item}
                    like={most}
                />

            ) : (<Link to={`/exercises/` + item.subThematic}>
                <div className="text-white text-lg font-bold hover:text-green-500 truncate">
                    <Latex>{item.question}</Latex>
                </div>
            </Link>)
        )
    };

    return (
        <div>
            <div className="flex flex-col items-center">
                <input className="fixed mt-2 p-5 bg-[#24252d] rounded-2xl w-4/6 outline-green-400 text-white"
                    type="text"
                    placeholder='Nhập "12, 11,...,tên chuyên đề, bài tâp"'
                    autoFocus={true}
                    onChange={handleChange}
                    onKeyUp={handleKeyUp}
                />
            </div>
            <div className="pt-5  text-white mt-20">
                <p className="text-white text-2xl border-b ml-16 mb-3">Kết quả tìm kiếm</p>
                <div className="flex justify-center">
                    {result ? (
                        <div className="bg-slate-700 p-3 w-5/6 rounded-md ">
                            <div className="bids-container-card">
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
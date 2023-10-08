import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

function SearchBar () {
    const  [input, setInput] = useState('');
    const [exercise, setExercise] = useState([]);
    const [thematic, setThematic] = useState([]);

    useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER_URL + "exercises")
            .then(res => setExercise(res.data))
            .catch(err => console.log(err));

        axios.get(process.env.REACT_APP_SERVER_URL + "thematics")
            .then(res => setThematic(res.data))
            .catch(err => console.log(err));
    },[]);

    const handleChange = (e) => {
        setInput(e.target.value);
       
    }

    const handleKeyUp = () => {
        const them = thematic.filter(f => f.code.includes(input));
        const namethem = thematic.filter(f => f.thematic.includes(input));
        const ex = exercise.filter(f => f.question.includes(input));
        const result = them.length? them:
                        (namethem.length? namethem:
                        (ex.length? ex: "Không tìm thấy"))
        console.log(result);
    }
    
    return (
        <>
            <input type="text" 
                    placeholder='Nhập bài tập, lớp...' 
                    autoFocus={true}
                    onChange={handleChange}
                    onKeyUp={handleKeyUp}
            />
        </>
    )
}

export default SearchBar;
import { useEffect, useState } from 'react';
import axios from 'axios';
import ListItem from '../listItem/listItem';
import { AiOutlinePlus } from "react-icons/ai";

const ExList = () => {
    const [thematics, setThematics] = useState()
    const [input, setInput] = useState();
    const [themResult, setThemResult] = useState();
    useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER_URL + "thematics")
            .then(res => {
                setThematics(res.data)
                setThemResult(res.data)})
            .catch(err => console.log(err))
    }, []);

    const handleKeyUp = () => {
        const grade = thematics.filter(f => f.code.includes(input));
        const names = thematics.filter(f => f.thematic.includes(input));
        
        setThemResult(grade.length ? grade :
            names.length ? names : "Không tìm thấy");
    }

    return(
        thematics ? (
            <div className="mx-10">
            <div className="text-lg sm:text-2xl font-bold text-green-500 mb-5 text-center">Danh sách chuyên đề</div>
            <div className='mx-5 mb-2 p-1 bg-teal-700 rounded-xl w-full flex'>
                <div className='flex w-1/3 m-2 hover:font-bold'>
                    <AiOutlinePlus size={30}/> 
                    Thêm chuyên đề
                </div>
                <div className='flex'>
                    <input className='rounded-lg text-black outline-none mt-1 h-10 px-3'
                    type="text"
                    placeholder='  Mã, tên chuyên đề...'
                    onChange={(e) => setInput(e.target.value)}
                    onKeyUp={handleKeyUp} />
                
                </div>
                
            </div>

            {Array.isArray(themResult) ?
                (<table className="table-fixed ml-5 border-collapse bg-slate-700 rounded-lg  border-neutral-600 w-full sm:md:text-lg text-xs">
                        <thead className="border-b-2">
                            <tr className='p-3'>
                                <th>Ảnh bìa</th>
                                <th>Mã chuyên đề</th>
                                <th>Tên chuyên đề</th>
                                <th>Tùy chỉnh</th>

                            </tr>
                        </thead>
                        <tbody className=''>
                            {themResult.map((them, index) => (
                                <ListItem
                                    key={index}
                                    item1={them.img}
                                    item2={them.code}
                                    item3={them.thematic} />))}
                        </tbody>
                    </table>
                ) : (<p className='text-lg text-amber-300 text-center'>{themResult}</p>)}
        </div>) : (<p className='p-20'>Đang tải dữ liệu...</p>)

        )
}

export default ExList;
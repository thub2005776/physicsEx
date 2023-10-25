import { useEffect, useState } from 'react';
import axios from 'axios';
import ListItem from './listItem';
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from 'react-router-dom';

const ExList = () => {
    const [thematics, setThematics] = useState()
    const [input, setInput] = useState();
    const [themResult, setThemResult] = useState();

    useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER_URL + "thematics")
            .then(res => {
                setThematics(res.data)
                setThemResult(res.data)
            })
            .catch(err => console.log(err))
    }, []);


    const handleKeyUp = () => {
        const grade = thematics.filter(f => f.code.includes(input));
        const names = thematics.filter(f => f.thematic.includes(input));

        setThemResult(grade.length ? grade :
            names.length ? names : "Không tìm thấy");
    }

    return (
        thematics ? (
            <div className="lg:mx-10">
                <div className="text-lg sm:text-2xl font-bold text-green-500 mb-5 text-center">Danh sách chuyên đề</div>
                <div className='mx-5 mb-2 p-1 bg-teal-700 rounded-xl w-full flex'>
                    <Link to={`/admin/2/themAdd`}>
                        <div className='flex m-2 hover:text-green-300 lg:text-lg'>
                            <AiOutlinePlus size={30} />
                            <div className=''>Thêm chuyên đề</div>
                        </div>
                    </Link>

                    <div className='flex sm:ml-40'>
                        <input className='rounded-lg text-black outline-none mt-1 h-10 px-3'
                            type="text"
                            placeholder='  Mã, tên chuyên đề...'
                            onChange={(e) => setInput(e.target.value)}
                            onKeyUp={handleKeyUp} />
                    </div>
                </div>

                {Array.isArray(themResult) ?
                    (<div className=" ml-5 border-collapse bg-slate-700 rounded-lg  border-neudival-600 w-full lg:text-lg text-md">
                        <div className="border-b-2">
                            <div className='p-3 grid grid-cols-4 font-medium'>
                                <div>Ảnh bìa</div>
                                <div>Mã chuyên đề</div>
                                <div>Tên chuyên đề</div>
                                <div className='text-right mr-5'>Tùy chỉnh</div>

                            </div>
                        </div>
                        <div className=''>
                            {themResult.map((them, index) => (
                                <ListItem
                                    key={index}
                                    item1={them.img}
                                    item2={them.code}
                                    item3={them.thematic} />))}
                        </div>
                    </div>
                    ) : (<p className='text-lg text-amber-300 text-center'>{themResult}</p>)}
            </div>) : (<p className='p-20'>Đang tải dữ liệu...</p>)

    )
}

export default ExList;
import { useState } from 'react';
import ListItem from './listItem';
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from 'react-router-dom';

const ThemList = ({thematics}) => {
    const [input, setInput] = useState();
    const [themResult, setThemResult] = useState(thematics);

    const handleKeyUp = () => {
        const grade = thematics.filter(f => f.code.includes(input));
        const names = thematics.filter(f => f.thematic.includes(input));

        setThemResult(grade.length ? grade :
            names.length ? names : "Không tìm thấy");
    }

    return (
        thematics ? (
            <div className="sm:mx-10">
                <div className="mt-5 text-lg sm:text-2xl font-bold text-green-500 mb-5 text-center">Danh sách chuyên đề</div>
                <div className='sticky top-[4.5rem] z-50 mx-5 mb-1 p-1 bg-teal-700 rounded-md w-full flex border border-gray-600'>
                    <Link to={`/admin/2/themAdd`}>
                        <div className='flex m-2 hover:text-green-300 sm:text-base text-sm'>
                            <AiOutlinePlus size={30} />
                            <div className=''>Thêm chuyên đề</div>
                        </div>
                    </Link>

                    <div className='flex sm:ml-40 sm:text-base text-sm'>
                        <input className='rounded-lg text-black outline-none mt-1 h-10 px-3'
                            type="text"
                            placeholder='  Mã, tên chuyên đề...'
                            onChange={(e) => setInput(e.target.value)}
                            onKeyUp={handleKeyUp} />
                    </div>
                </div>

                {Array.isArray(themResult) ?
                    (<div className=" ml-5 border-collapse bg-slate-700 rounded-md  border border-gray-600 w-full sm:text-lg text-sm">
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

export default ThemList;
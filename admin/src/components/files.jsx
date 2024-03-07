import { useState } from 'react';
import ListItem from './listItem';
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from 'react-router-dom';

const Files = ({files}) => {
    const [input, setInput] = useState();
    const [result, setResult] = useState(files && files);

    const handleKeyUp = () => {
        const grade = files && files.filter(f => f.grade && f.grade.toLowerCase().includes(input.toLowerCase()));
        const names = files && files.filter(f => f.name && f.name.toLowerCase().includes(input.toLowerCase()));
        
        setResult(grade.length > 0 ? grade :
            names.length > 0 ? names : "Không tìm thấy");
    }

    return(
        files && result ? (
            <div className="sm:mx-10">
            <div className="mt-5 text-lg sm:text-2xl font-bold text-green-500 mb-5 text-center">Danh sách tài liệu</div>
            <div className='mx-5 mb-1 p-1 bg-teal-700 rounded-md w-full flex justify-center border border-gray-600'>
                <div className='flex justify-between gap-4 sm:text-base text-sm'>
                <Link to={`/admin/3/add`}>
                        <div className='flex m-2 hover:text-green-300 sm:text-base text-sm'>
                            <AiOutlinePlus size={30} />
                            <div className=''>Thêm chuyên đề</div>
                        </div>
                    </Link>
                    <input className='rounded-lg bg-gray-800 outline-none mt-1 h-10 px-3'
                    type="text"
                    autoFocus
                    placeholder='  Lớp, tên tài liệu...'
                    onChange={(e) => setInput(e.target.value)}
                    onKeyUp={handleKeyUp} />
                </div>
            </div>

            
            {Array.isArray(result) ?
            <div className="table-fixed ml-5 border-collapse bg-gray-800 rounded-md  border border-gray-600 w-full sm:md:text-lg text-xs">
                        <div className="border-b-2 align-baseline ">
                            <div className='p-3 grid grid-cols-3 font-medium'>
                                <div className='ml-4'>Lớp</div>
                                <div>Tên tài liệu</div>
                                <div className='text-right mr-5'>Tùy chỉnh</div>

                            </div>
                        </div>
                        <div className=''>
                            {result.map((file, index) => (
                                <ListItem key={index} name={'file'}  data={file}/>))}
                        </div>
                    </div>: (<p className='text-lg text-amber-300 text-center'>{result}</p>)}
        </div>) : (<p className='p-20'>Đang tải dữ liệu...</p>)
    )
}

export default Files;
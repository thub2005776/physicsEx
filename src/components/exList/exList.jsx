import { useEffect, useState } from 'react';
import { AiFillDelete, AiOutlineEdit } from "react-icons/ai";
import axios from 'axios';

const ExList = () => {
    const [thematics, setThematics] = useState()

    useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER_URL + "thematics")
            .then(res => setThematics(res.data))
            .catch(err => console.log(err))
    }, []);

    const Thematic = ({ thematic }) => {
        return (
            <tr className=" border-b-0 mb-2 hover:bg-slate-600">
                <td className='p-3 flex'>
                    <img className='w-[50px] h-[40px] sm:w-[100px] sm:h-[90px] rounded-xl'
                        src={process.env.REACT_APP_SERVER_URL + thematic.img}
                        alt={thematic.name} /></td>
                <td >{thematic.code}</td>
                <td >{thematic.thematic}</td>
                
                <td className='flex ml-20'>
                    <div className='p-2 hover:bg-slate-500 rounded-lg'>
                        <AiOutlineEdit />
                    </div>
                    <div className='p-2 hover:bg-slate-500 rounded-lg'>
                        <AiFillDelete />
                    </div>
                </td>
            </tr>
        )
    }
    return(
        thematics ? (
            <div className="mx-10">
                <div className="text-lg sm:text-2xl font-bold text-green-500 mb-5 text-center">Danh sách Chuyên đề</div>
                <div className='mx-5 mb-2 p-1 bg-teal-700 rounded-xl w-full flex justify-center'>
                        <input className='rounded-lg text-black outline-none mt-1 w-2/5 h-10 px-3' 
                            type="text" 
                            placeholder='  Tên, email...'
                            onFocus={true}/>
                        <button className='py-1 px-4 m-2 bg-green-500 rounded-lg '>Tìm</button>
                </div>
                <div>
                    <table className="table-fixed ml-5 border-collapse bg-slate-700 rounded-lg  border-neutral-600 w-full sm:md:text-lg text-xs">
                        <thead className="border-b-2 align-baseline  ">
                            <tr className='p-3'>
                                <th>Ảnh bìa</th>
                                <th>Mã chuyên đề</th>
                                <th>Tên chuyên đề</th>
                                <th>Tùy chỉnh</th>

                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            {thematics.map((thematic, index) => (
                                <Thematic
                                    key={index}
                                    thematic={thematic} />
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>) : (<p>Loading...</p>)
        )
}

export default ExList;
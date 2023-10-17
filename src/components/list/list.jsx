
import { AiFillDelete, AiOutlineEdit, AiOutlineUserDelete } from "react-icons/ai";

const List = ({headerArr, list}) => {
    
    const Record = ({item1, item2, item3}) => {
        return (
            <tr className=" border-b-0 mb-2 hover:bg-slate-600">
                <td className='p-3 flex'>
                    {item1? (
                        <img className='w-[50px] h-[40px] sm:w-[100px] sm:h-[90px] rounded-xl'
                        src={process.env.REACT_APP_SERVER_URL + item1}
                        alt={item3} />
                    ): null}</td>
                    
                <td >{item2}</td>
                <td >{item3}</td>
                
                <td className='flex ml-20'>
                    <div className='p-2 hover:bg-slate-500 rounded-lg'>
                        <AiOutlineEdit />
                    </div>
                    <div className='p-2 hover:bg-slate-500 rounded-lg'>
                        {headerArr[1] === "Tên người dùng"? <AiOutlineUserDelete/>:<AiFillDelete />}
                    </div>
                </td>
            </tr>
        )
    }
    return(
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
                            {headerArr.map((e, i) => (
                                <th key={i}>{e}</th>
                            ))}
                            <th>Tùy chỉnh</th>
                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            {list.map((item, index) => (
                                <Item key={index} 
                                    
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
}

export default List;
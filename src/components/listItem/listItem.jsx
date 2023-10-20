
import { AiFillDelete, AiOutlineEdit, AiOutlinePlusCircle } from "react-icons/ai";


const ListItem = ({ item1, item2, item3, item4, user }) => {
    return (
        <tr className=" border-b-0 mb-2 hover:bg-slate-500">
            {item1 ? (<>
                <td className='p-3 flex'>
                    <img className='w-[20px] h-[30px] sm:w-[50px] sm:h-[40px] rounded-xl ml-10'
                        src={process.env.REACT_APP_SERVER_URL + item1}
                        alt={item3} />
                </td>
                <td className="">{item2}</td>
                <td className="">{item3}</td>
                {user ? <td className="">{item4}</td> : null}
            </>
            ) : <>
                <td className="">{item2}</td>
                <td className="">{item3}</td>
            </>}


            <td className='flex justify-center'>
                {user? 
                null:
                <div className='p-2 hover:bg-slate-500 rounded-lg'>
                    <AiOutlinePlusCircle />
                </div>}
                
                <div className='p-2 hover:bg-slate-500 rounded-lg'>
                    <AiOutlineEdit />
                </div>
                <div className='p-2 hover:bg-slate-500 rounded-lg'>
                    <AiFillDelete/>
                </div>
            </td>
        </tr>
    )

}

export default ListItem;

import { AiFillDelete, AiOutlineEdit, AiOutlinePlusCircle } from "react-icons/ai";
import Delete from "../delete/delete";

const ListItem = ({ item1, item2, item3, item4, user, Add, Edit }) => {
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
                    {user? <td className="">{item4}</td> : null}
                </>
                ) :<>
                    <td className="">{item2}</td>
                    <td className="">{item3}</td>
                </>}


            <td className='flex ml-24'>
                {user ? null :
                    <>
                        <div className='p-2 hover:bg-slate-500 rounded-lg'
                            onClick={Add}>
                            <AiOutlinePlusCircle />
                        </div>
                        <div className='p-2 hover:bg-slate-500 rounded-lg'
                            onClick={Edit}>
                            <AiOutlineEdit />
                        </div>
                    </>}
                    <Delete/>
            </td>
        </tr>
    )

}

export default ListItem;
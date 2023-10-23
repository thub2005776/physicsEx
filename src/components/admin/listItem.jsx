
import { AiFillDelete, AiOutlineEdit, AiOutlinePlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";


const ListItem = ({ item1, item2, item3, item4, user }) => {

    return (
        <div className={`grid ${user? "grid-cols-5": item1? "grid-cols-4": "grid-cols-3"} p-1 border-b-0 my-2 hover:bg-slate-500 sm:text-base text-sx`}>
            {item1 ? 
            (<><img className='w-[20px] h-[20px] lg:w-[40px] lg:h-[40px] rounded-full mx-5'
                        src={process.env.REACT_APP_SERVER_URL + item1}
                        alt={item3} />
                <div className="">{item2}</div>
                <div className="truncate">{item3}</div>
                {user ? <div className="">{item4}</div> : null}
            </>
            ) : <>
                <div className="">{item2}</div>
                <div className="">{item3}</div>
            </>}


            <div className='flex justify-end mr-5'>
                {user? 
                null:
                <Link to={`add/${item2}`}
                    className='p-2 hover:bg-slate-500 rounded-lg '>
                    <AiOutlinePlusCircle />
                </Link >}
                
                <Link to={user? `/profile/${user.uid}`: `edit/${item2}`}
                    className='p-2 hover:bg-slate-500 rounded-lg'>
                    <AiOutlineEdit />
                </Link>
                <div className='p-2 hover:bg-slate-500 rounded-lg'>
                    <AiFillDelete/>
                </div>
            </div>
        </div>
    )

}

export default ListItem;

import { AiFillDelete, AiOutlineEdit, AiOutlinePlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router';
import { useEffect, useState } from "react";
import axios from 'axios';
import Delete from './delete';

const ListItem = ({ item1, item2, item3, item4, user }) => {
    const location = useLocation();
    const path = location.pathname.split('/')[2];
    const [del, setDel] = useState(false);
    const [img, setImg] = useState(item1);
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        //get exercises
      axios.get(process.env.REACT_APP_SERVER_URL + "exercises")
      .then(exercises => setExercises(exercises.data))
      .catch(err => console.log(err))
    }, [])
    
    const handleDelete = (e) => {
        if(e) {
            if(user) {
                const uid = user.uid;
                axios.post(process.env.REACT_APP_SERVER_URL + "del/user", { uid, img })
                .then(res => {
                    alert("Đã xóa!");
                    window.location.reload(true);
                })
                .catch(err => console.log(err))
        } else if(item1) {
            const code = item2;
            const ex = exercises && exercises.filter(f => f.subThematic === code)
            axios.post(process.env.REACT_APP_SERVER_URL + "del/them/ex", { code, ex })
                .then()
                .catch(err => console.log(err))

            axios.post(process.env.REACT_APP_SERVER_URL + "del/them", { code, img })
                .then(res => {
                    alert("Đã xóa!");
                    window.location.reload(true);
                })
                .catch(err => console.log(err))
            
        } else {
            const name = item3;
            axios.post(process.env.REACT_APP_SERVER_URL + "del/file", { name })
                .then(res => {
                    alert("Đã xóa!");
                    window.location.reload(true);
                })
                .catch(err => console.log(err))
        }
        }
        
    }

    return (
        <div className={`relative flex justify-between border-b-0 my-2 hover:bg-slate-500 sm:text-base text-sx`}>
            <Link to={user? `/profile/${user.uid}`: item1? `them/${item2}`:`edit/${item2}/${item3}`}
                className="flex-1 grid grid-cols-4 gap-5">
            {item1 ? 
            (<><img className='w-[20px] h-[20px] lg:w-[40px] lg:h-[40px] rounded-full mx-5'
                        src={process.env.REACT_APP_SERVER_URL + item1}
                        alt={item3} />
                <div className="">{item2}</div>
                <div className="truncate">{item3}</div>
                {user ? <div className="">{item4}</div> : null}
            </>
            ) : <>
                <div className="ml-5">{item2}</div>
                <div className=" truncate">{item3}</div>
            </>}
            </Link> 

            <div className='flex justify-end mr-5'>
                {user? 
                null:
                <Link to={`add/${item2}/${item3}`}
                    className='p-2 hover:bg-slate-600 rounded-lg '>
                    <AiOutlinePlusCircle />
                </Link >}
                
                <Link to={user? `/profile/${user.uid}`: `edit/${item2}/${item3}`}
                    className='p-2 hover:bg-slate-600 rounded-lg'>
                    <AiOutlineEdit />
                </Link>
                <div className=' p-2 hover:bg-slate-600 rounded-lg'
                     onClick={() => setDel(!del)}>
                    <AiFillDelete/>
                   
                </div>
                
            </div>
            {del && 
            <div className="absolute top-0 right-80 z-[100]">
                <Delete sendDelete={handleDelete}/>
            </div>}
        </div>
       
    )

}

export default ListItem;
import { useEffect, useState } from 'react';
import axios from 'axios';
import ListItem from '../listItem/listItem';
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from 'react-router-dom';

const UserList = () => {
    const [users, setUSers] = useState();
    const [input, setInput] = useState();


    useEffect(() => {
        axios.post(process.env.REACT_APP_SERVER_URL + "profile")
            .then(res => {
                setUSers(res.data)
                setUserResult(res.data)})
            .catch(err => console.log(err))
    }, [])

    const [usersResult, setUserResult] = useState();

    const handleKeyUp = () => {
        const emails = users.filter(f => f.email.includes(input));
        const names = users.filter(f => f.name.includes(input));
        
        setUserResult(emails.length ? emails :
            names.length ? names : "Không tìm thấy");
    }


    return (
        users ? (
            <div className="mx-10 ">
                <div className="text-lg sm:text-2xl font-bold text-green-500 mb-5 text-center">Danh sách người dùng</div>
                <div className='mx-5 mb-2 p-1 bg-teal-700 rounded-xl w-full flex justify-start'>
                <Link to={`/admin/1/add`}>
                <div className='flex m-2 hover:text-green-300 sm:mr-20'>
                    <AiOutlinePlus size={30}/> 
                    Thêm người dùng
                </div>
                </Link>
                
                    <input className='rounded-lg text-black outline-none mt-1 w-2/5 h-10 px-3'
                        type="text"
                        placeholder='  Tên, email...'
                        onChange={(e) => setInput(e.target.value)}
                        onKeyUp={handleKeyUp} 
                        />
                </div>

                {Array.isArray(usersResult) ?
                    (<table className="table-fixed ml-5 border-collapse bg-slate-600 rounded-lg  border-neutral-600 w-full sm:md:text-lg text-xs">
                            <thead className="border-b-2">
                                <tr className='p-3'>
                                    <th >Ảnh đại diện</th>
                                    <th>Tên người dùng</th>
                                    <th>Email</th>
                                    <th>Vai trò</th>
                                    <th>Tùy chỉnh</th>

                                </tr>
                            </thead>
                            <tbody className='text-center'>
                                {usersResult.map((user, index) => (
                                    <ListItem
                                        key={index}
                                        item1={user.img}
                                        item2={user.name}
                                        item3={user.email}
                                        item4={user.permission}
                                        user={true} />))}
                            </tbody>
                        </table>
                    ) : (<p className='text-lg text-amber-300 text-center'>{usersResult}</p>)}
            </div>) : (<p className='p-20'>Đang tải dữ liệu...</p>)

    )
}

export default UserList;
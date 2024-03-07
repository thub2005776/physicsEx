import { useState } from 'react';
import ListItem from './listItem';
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from 'react-router-dom';

const UserList = ({ users }) => {
    const [input, setInput] = useState();
    const [usersResult, setUserResult] = useState(users.filter(f => f.permission && f.permission.toLowerCase().includes('user')));
    const [active, setActive] = useState(true);
    const handleKeyUp = () => {
        const emails = users.filter(f => f.email && f.email.toLowerCase().includes(input.toLowerCase()));
        const names = users.filter(f => f.name && f.name.toLowerCase().includes(input.toLowerCase()));

        setUserResult(emails.length > 0 ? emails :
            names.length > 0 ? names : "Không tìm thấy");
    }

    return (
        users && usersResult ? (
            <div className="sm:mx-10">
                <div className="mt-5 text-lg sm:text-2xl font-bold text-green-500 mb-5 text-center">Danh sách người dùng</div>
                <div className='sticky top-[4.5rem] z-50 mx-5 mb-1 p-1 bg-teal-700 rounded-md w-full flex justify-around border border-gray-600'>
                    <Link to={`/admin/1/add`}>
                        <div className='flex m-2 hover:text-green-300 sm:mr-20  '>
                            <AiOutlinePlus size={30} />
                            <span className='hidden lg:inline text-base'>Thêm tài khoản</span>
                        </div>
                    </Link>

                    <input className='rounded-md bg-gray-800 text-black outline-none mt-1 w-2/5 h-10 px-3'
                        type="text"
                        placeholder='  Tên, email, user/admin...'
                        onChange={(e) => setInput(e.target.value)}
                        onKeyUp={handleKeyUp}
                    />

                    <div className="flex items-center me-4 ">
                        <input id="inline-radio" type="radio" value="" name="inline-radio-group" className="w-4 h-4"
                            onChange={() => {
                                setUserResult(users.filter(f => f.permission.includes('user')))
                                setActive(true)
                            }} checked={active} />
                        <label htmlFor="inline-radio" className="ms-2 text-sm font-medium text-white">user</label>
                    </div>
                    <div className="flex items-center me-4">
                        <input id="inline-2-radio" type="radio" value="" name="inline-radio-group" className="w-4 h-4 "
                            onChange={() => {
                                setUserResult(users.filter(f => f.permission.includes('admin')))
                                setActive(false)
                            }} />
                        <label htmlFor="inline-2-radio" className="ms-2 text-sm font-medium text-white">admin</label>
                    </div>
                </div>
                <div className="relative ml-5 border-collapse bg-gray-800 rounded-md border border-gray-600 w-full sm:md:text-lg text-xs">
                    <div className="border-b-2 flex">
                        <div className='flex-1 ml-5 py-3 grid grid-cols-4 gap-5 font-medium text-base'>
                            <div >Ảnh đại diện</div>
                            <div>Tên người dùng</div>
                            <div>Email</div>
                            <div>Vai trò</div>
                        </div>
                        <div className=' mr-5 py-3'>Tùy chỉnh</div>
                    </div>
                    <div className='text-base'>
                        {usersResult.length > 0 && usersResult.map((user, index) => (
                            <ListItem
                                key={index} name={'users'} data={user} />))}
                    </div>
                </div>
            </div>) : (<p className='p-20'>Đang tải dữ liệu...</p>)
    )
}

export default UserList;
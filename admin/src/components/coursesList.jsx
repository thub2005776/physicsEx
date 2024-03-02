import { useState } from 'react';

import Search from './search';
import CardItem from './cardItem';
import { Link } from 'react-router-dom';

const CoursesList = ({ courses }) => {
    //12  https://www.youtube.com/playlist?list=PLNEiyqaLw3NkfBj_Cx2aF-O5mOOyBfYg_
    // https://www.youtube.com/playlist?list=PLhM0cQTOB54o6Nhxlv9fnhzGX3NEz4hav
    // https://www.youtube.com/playlist?list=PLOVaCZ_HQkvff80K_Dzf7a0O1Q0WB0vrf
    // https://www.youtube.com/playlist?list=PLOVaCZ_HQkvdHQ5TBJ6fArFkknzw492pN

    // 11 https://www.youtube.com/playlist?list=PLhM0cQTOB54q7x_IYr5HFWVkqdXD9vFL2
    // https://www.youtube.com/playlist?list=PLOVaCZ_HQkveSVHAL8LqCcXGzAQe-EGEU
    // https://www.youtube.com/playlist?list=PLOVaCZ_HQkvdf54wayAyZeQuhnp61N7vg
    // https://www.youtube.com/playlist?list=PLOVaCZ_HQkve1V_FrTKyoXUBuE5-gqc7A

    // 10 https://www.youtube.com/playlist?list=PLhM0cQTOB54p9H3SMbTeom4VS4j5VOvwl
    // https://www.youtube.com/playlist?list=PLOz0SKVB63i2FHaJuDmyigBJ60nzKig0m
    // https://www.youtube.com/playlist?list=PLDHr_ecbSve6YWoN2Fe7nLWppcY8-drI3
    // https://www.youtube.com/playlist?list=PLOVaCZ_HQkvevQFyg0Xc4K9NNrj5cBpV7
    // https://www.youtube.com/playlist?list=PLOVaCZ_HQkvezF1X0bXTDSdUNkjHF4U1I

    const [active, setActive] = useState('12');
    const [search, setSearch] = useState(false);

    const courseFilter = courses && courses.length > 0 && courses.filter(f => f.grade === active);

    const handleClosed = (e) => {
        setSearch(!e);
    }
    return (
        courses && courses.length > 0 &&
        <div className='mt-20 mx-2'>
            <div className="relative w-full p-4 border rounded-lg shadow  bg-gray-800 border-gray-700">
                {search && <Search data={courses} name='courses' closed={handleClosed} />}
                <div className='flex justify-between'>
                    <button type="button" id="simple-search"
                        className="flex-1 flex justify-center border text-sm text-gray-400 rounded-lg max-w-sm mx-auto mb-2 ps-10 p-2.5  bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                        onClick={() => setSearch(!search)} >
                        
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                            </svg>
                        Vật lý 12 </button>
                    <Link to={`/admin/4/add`}>
                        <svg className="w-10 h-10 text-white hover:text-green-400 hover:cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 7.8v8.4M7.8 12h8.4m4.8 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </Link>

                </div>
                <ul className="text-sm font-medium text-center  rounded-lg shadow flex divide-gray-700 text-gray-400">
                    <li className="w-full focus-within:z-10">
                        <div className={`inline-block w-full p-4  border-r  border-gray-700 rounded-s-lg focus:ring-4 focus:ring-blue-300 focus:outline-none  text-white bg-gray-800 hover:bg-green-500 hover:cursor-pointer 
                        ${active === '12' && 'bg-green-600'}`}
                            onClick={() => setActive('12')}>Lớp 12</div>
                    </li>
                    <li className="w-full focus-within:z-10">
                        <div className={`inline-block w-full p-4  border-r  border-gray-700   focus:ring-4 focus:ring-blue-300 focus:outline-none text-white bg-gray-800 hover:bg-green-500 hover:cursor-pointer 
                        ${active === '11' && 'bg-green-600'}`}
                            onClick={() => setActive('11')}>Lớp 11</div>
                    </li>
                    <li className="w-full focus-within:z-10">
                        <div className={`inline-block w-full p-4  border-r  border-gray-700 rounded-e-lg  focus:ring-4 focus:ring-blue-300 focus:outline-none text-white bg-gray-800 hover:bg-green-500 hover:cursor-pointer 
                        ${active === '10' && 'bg-green-600'}`}
                            onClick={() => setActive('10')}>Lớp 10</div>
                    </li>
                </ul>
                <div className="flow-root">
                    <div className="divide-y  divide-gray-700">
                        {courseFilter && courseFilter.length > 0 ? courseFilter.map((c, i) => (
                            <CardItem key={i} data={c} name={'course'} />
                        )) : <p className='mt-2 text-white text-center text-base'>Không có khóa học nào</p>}

                    </div>
                </div>
            </div>

        </div>

    )
}

export default CoursesList;
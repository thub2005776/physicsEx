
import { useState } from 'react';
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
    const courseFilter = courses && courses.length > 0 && courses.filter(f => f.grade === active);

    const CourseItem = ({ course }) => {
        return (
            <Link to={`/admin/4/${course._id}`}>
                <div className="py-1 sm:py-4 hover:border-b-[0.5px]">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <img className="w-8 h-8 rounded-full" src={process.env.REACT_APP_SERVER_URL + course.img} alt={course.name} />
                        </div>
                        <div className="flex-1 min-w-0 ms-4">
                            <p className="text-sm font-medium  truncate text-white">
                                {course.name}
                            </p>
                            <p className="text-sm truncate text-gray-400">
                                view
                            </p>
                        </div>
                        <div className={`inline-flex items-center`}>
                            <p className={`text-xs font-medium me-2 px-2.5 py-0.5 rounded 
                            ${course.level === 'easy' ? 'bg-green-900 text-green-300' :
                                    course.level === 'medium' ? 'bg-blue-900 text-blue-300' :
                                        course.level === 'hard' ? 'bg-yellow-900 text-yellow-300' :
                                            'bg-pink-900 text-pink-300'}`}>
                                {course.level}
                            </p>
                            <div className='p-1 border border-gray-600 hover:bg-slate-600 rounded-lg'>
                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M8.6 2.6A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4c0-.5.2-1 .6-1.4ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clipRule="evenodd" />
                                </svg>
                            </div>


                        </div>
                    </div>
                </div>
            </Link>

        )
    }

    return (
        courses && courses.length > 0 &&
        <div className='pt-20 md:mx-10'>
            <div className="w-full p-4  border  rounded-lg shadow sm:p-8 bg-gray-800 border-gray-700">
                <ul className="hidden text-sm font-medium text-center  rounded-lg shadow sm:flex divide-gray-700 text-gray-400">
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
                            <CourseItem key={i} course={c} />

                        )) : <p className='mt-2 text-white text-center text-base'>Không có khóa học nào</p>}

                    </div>
                </div>
            </div>

        </div>

    )
}

export default CoursesList;
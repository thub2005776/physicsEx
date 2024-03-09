import { Link } from "react-router-dom";


const CourseItem = ({ auth, course }) => {
    return (
        course &&
        <Link to={`/courses/${course._id}`}>
            <div className="w-[12rem] h-[15rem] mb-6 border rounded-lg shadow hover:cursor-pointer hover:-mt-2 hover:z-[100] bg-gray-800 border-gray-700">
                <img className="rounded-t-lg w-[15rem] h-[10rem]" src={process.env.REACT_APP_SERVER_URL + course.img} alt={course.name} />
                <div className="p-2">
                    <h5 className="mb-2 text-sm font-bold tracking-tight text-white">{course.name}</h5>
                    <div className="flex justify-center gap-4">
                        <p className=" font-normal  text-gray-400">{course.enroll} lượt học</p>
                        <div className="inline-flex items-center">
                            <p className={`text-xs font-medium me-2 px-2.5 py-0.5 rounded 
                        ${course.level === 'easy' ? 'bg-green-900 text-green-300' :
                                    course.level === 'medium' ? 'bg-blue-900 text-blue-300' :
                                        course.level === 'hard' ? 'bg-yellow-900 text-yellow-300' :
                                            'bg-pink-900 text-pink-300'}`}>
                                {course.level}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default CourseItem;
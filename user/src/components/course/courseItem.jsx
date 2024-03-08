

const CourseItem = ({ auth, course }) => {
    return (
        course &&
        <div>
            <div className="w-[15rem] h-[15rem] mb-6 border rounded-lg shadow hover:cursor-pointer hover:-mt-4 bg-gray-800 border-gray-700">
                <img className="rounded-t-lg w-[15rem] h-[10rem]" src={process.env.REACT_APP_SERVER_URL + course.img} alt={course.name} />
                <div className="p-2">
                    <h5 className="mb-2 text-sm font-bold tracking-tight text-white">{course.name}</h5>
                    <p className=" font-normal  text-gray-400">{course.enroll} lượt học</p>
                </div>
            </div>
        </div>
    )
}

export default CourseItem;
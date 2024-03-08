import { CourseList } from "../../components";

const Courses = ({auth, courses}) => {

    return (
        courses &&
        <div className="text-white pt-10 text-center">
            <div className="text-3xl font-bold">{courses.length} khóa học</div>
            <div>
                <CourseList auth={auth} courses={courses} title={"Khóa học miễn phí"}/>
            </div>
        </div>
    )
}

export default Courses;
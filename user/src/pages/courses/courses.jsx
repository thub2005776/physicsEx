import { CourseList } from "../../components";

const Courses = ({auth, courses}) => {
    const courseFree = courses && courses.filter(f => f.level && f.level !== 'so hard' && f.level !== 'hard');
    const courseAdvanced = courses && courses.filter(f => f.level && (f.level === 'so hard' || f.level === 'hard'))
    return (
        courses && courseFree && courseAdvanced &&
        <div className="pt-10 ms-5">
            <div className="text-center text-3xl font-bold text-green-500">{courses.length} khóa học</div>
            <div>
                <CourseList auth={auth} courses={courseFree} title={"Khóa học miễn phí"}/>
            </div>
            <div>
                <CourseList auth={auth} courses={courseAdvanced} title={"Khóa học nâng cao"}/>
            </div>
        </div>
    )
}

export default Courses;
import { CourseTestList } from "../../components";

const Courses = ({ courses }) => {
    const courseFree = courses && courses.filter(f => f.level && f.level !== 'so hard' && f.level !== 'hard');
    const courseAdvanced = courses && courses.filter(f => f.level && (f.level === 'so hard' || f.level === 'hard'))
    return (
        courses && courseFree && courseAdvanced &&
        <div className="pt-10 ms-5">
            <div className="text-center text-3xl font-bold text-green-500">{courses.length} khóa học</div>
            <CourseTestList data={courseFree} title={"Khóa học cơ bản"} name={'courses'} />
            <CourseTestList  data={courseAdvanced} title={"Khóa học nâng cao"} name={'courses'} />
        </div>
    )
}

export default Courses;
import { CourseTestList } from "../../components";


const Tests = ({ tests }) => {
    const testsFree = tests && tests.filter(f => f.level !== 'hard' && f.level !== 'so hard');
    const testsAdvanced = tests && tests.filter(f => f.level === 'hard' || f.level === 'so hard');

    return (
        tests && testsFree && testsAdvanced &&
        <div className="pt-10 ms-5">
            <div className="text-center text-3xl font-bold text-green-500">{tests.length} khóa học</div>
            <CourseTestList data={testsFree} title={"Bài kiểm tra cơ bản"} name={'tests'} />
            <CourseTestList data={testsAdvanced} title={"Bài kiểm tra nâng cao"} name={'tests'}/>
        </div>
    )
}

export default Tests;
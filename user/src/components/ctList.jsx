import CourseTestItem from "./ctItem";


const CourseTestList = ({ data, title}) => {
    return (
    data && 
        <div className='mb-6'>
            <div className='text-3xl text-white mb-6 font-semibold'>{title}</div>
            <div className='flex flex-wrap gap-4'>
                {data.map((t, i) => (
                <CourseTestItem key={i} data={t}/>
            ))} 
            </div>
        </div>
    )
}

export default CourseTestList;
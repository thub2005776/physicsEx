import CourseTestItem from "./ctItem";


const CourseTestList = ({ data, title, name}) => {
    return (
    data && 
        <div className='mb-6'>
            <div className='text-3xl text-white mb-6 font-semibold'>{title}</div>
            <div className='flex flex-wrap gap-4'>
                {data.map((t, i) => (
                <CourseTestItem key={i} data={t} name={name}/>
            ))} 
            </div>
        </div>
    )
}

export default CourseTestList;
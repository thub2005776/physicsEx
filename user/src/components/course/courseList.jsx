import { CourseItem } from '../../components';

const CourseList = ({auth, courses, title}) => {
    
    return (
        courses && 
        <div className='mb-6'>
            <div className='text-3xl text-white mb-6 font-semibold'>{title}</div>
            <div className='flex flex-wrap gap-4'>
                {courses.map((c, i) => (
                <CourseItem key={i} auth={auth} course={c}/>
            ))} 
            </div>
        </div>
    )
}

export default CourseList;
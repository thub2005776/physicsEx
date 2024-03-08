import { CourseItem } from '../../components';

const CourseList = ({auth, courses, title}) => {
    return (
        courses &&
        <div className='mb-6 text-white text-center'>
            <div className='text-3xl'>{title}</div>
            <div className=''>
                {courses.map((c, i) => (
                <CourseItem key={i} auth={auth} course={c}/>
            ))} 
            </div>
           
            
        </div>
    )
}

export default CourseList;
import { SideBarAdmin, AdminCard, UserList, ThemList, Files, CoursesList, TestList, Comments } from '../components'
import { Statatics } from '../pages'
import { useLocation } from 'react-router';

function Admin({ auth, users, thematics, exercises, files, com, courses, tests, enrollCourse, enrollTest }) {
    const location = useLocation();
    const path = location.pathname.split('/')[2];
    const index = parseInt(path);


    return (
        auth && auth.permission === 'admin' &&
        (
            <div className="flex justify-between text-white">
                <div className="fixed top-[20%] left-0 sm:w-1/5 w-1/12 shadow-md rounded-md border border-gray-600 bg-gray-900">
                    <SideBarAdmin active={index} />
                </div>

                <div className='sm:ml-auto sm:w-4/5 ml-10 w-10/12'>
                    {index === 0 &&
                        <div className='mt-10 md:grid grid-cols-3 float-right sm:w-5/6 w-5/6'>
                            <AdminCard users={users} exercises={exercises} docs={files} courses={courses} />
                        </div>}
                    {index === 1 && <UserList users={users} />}
                    {index === 2 && <ThemList thematics={thematics} />}
                    {index === 3 && <Files files={files} />}
                    {index === 4 && <CoursesList courses={courses} />}
                    {index === 5 && <TestList tests={tests} />}
                    {index === 6 && <Comments comm={com} user={users} auth={auth} />}
                    {index === 7 &&
                        <Statatics
                            auth={auth}
                            exe={exercises}
                            enrollCourse={enrollCourse}
                            enrollTest={enrollTest} />}

                </div>
            </div>

        )

    )
}

export default Admin;
import { SideBarAdmin, AdminCard, ChartItem, UserList, ThemList, Files } from '../components'
import { useLocation } from 'react-router';

function Admin({ auth, users, thematics, exercises, files }) {
    const location = useLocation();
    const path = location.pathname.split('/')[2];
    const index = parseInt(path);


    return (
        auth && auth.permission === 'admin' &&
        (
            <div className="flex justify-between text-white">
                <div className="fixed top-1/3 left-0 sm:w-1/5 w-1/12 shadow-md rounded-md border border-gray-600 bg-gray-900">
                    <SideBarAdmin active={index} />
                </div>

                <div className='sm:ml-64 sm:w-4/5 ml-10 w-10/12'>
                    {index === 0 ?
                        (< >
                            <div className='sm:flex sm:ml-16 sm:w-5/6  ml-10'>
                                <AdminCard users={users} exercises={exercises} docs={files} />
                            </div>
                        </>)
                        : (index === 1 ?
                            (
                                <UserList users={users} />
                            ) : (index === 2 ?
                                (
                                    <ThemList thematics={thematics} />
                                ) : (index === 3 ?
                                    (
                                        <Files files={files} />
                                    ) : (
                                        <ChartItem exercises={exercises} />
                                    ))))
                    }
                </div>
            </div>

        )

    )
}

export default Admin;
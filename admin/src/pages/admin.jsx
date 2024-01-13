import { SideBarAdmin, AdminCard, UserList, ThemList, Files } from '../components'
import { Statatics } from '../pages'
import { useLocation } from 'react-router';

function Admin({ auth, users, thematics, exercises, files, com }) {
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

                <div className='sm:ml-auto sm:w-4/5 ml-10 w-10/12'>
                    {index === 0 ?
                        (< >
                            <div className='md:flex lg:ml-16 lg:w-5/6 w-full'>
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
                                        <Statatics auth={auth} user={users} exe={exercises} comm={com}/>
                                    ))))
                    }
                </div>
            </div>

        )

    )
}

export default Admin;
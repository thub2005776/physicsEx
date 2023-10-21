import { SideBarAdmin, AdminCard, Chart, UserList, ExList, Files } from '../../components'
import { useLocation } from 'react-router';

function Admin({ auth }) {
    const location = useLocation();
    const path = location.pathname.split('/')[2];
    const index = parseInt(path);

    return (
        auth && auth.permission === 'admin' ?
            (
                <div className="flex justify-between sm:m-5 text-white">
                    <div className="fixed sm:w-1/5 w-1/12 bg-[#24252d]">
                        <SideBarAdmin active={index} />
                    </div>
                    <div className='sm:ml-64 sm:w-4/5  '>
                        {index === 0 ?
                            (< >
                                <div className='sm:flex sm:ml-16 sm:w-5/6  ml-10'>
                                    <AdminCard />
                                </div>
                                <div className=''>
                                    <Chart />
                                </div>
                            </>)
                            : (index === 1 ?
                                (
                                    <UserList />
                                ) : (index === 2 ?
                                    (
                                        <ExList />
                                    ) : (index === 3 ?
                                        (
                                            <Files />
                                        ) : (
                                            <Chart />
                                        ))))
                        }
                    </div>
                </div>
            ) : <div className='text-orange-700 text-lg  sm:text-xl text-center'>
                Bạn không thể truy cập vào trang web này!
                </div>

    )
}

export default Admin;
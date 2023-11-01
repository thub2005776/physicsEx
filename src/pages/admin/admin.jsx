import { SideBarAdmin, AdminCard, ChartItem, UserList, ThemList, Files } from '../../components'
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
                    <div className='sm:ml-64 sm:w-4/5 ml-10 w-10/12'>
                        {index === 0 ?
                            (< >
                                <div className='sm:flex sm:ml-16 sm:w-5/6  ml-10'>
                                    <AdminCard />
                                </div>
                            </>)
                            : (index === 1 ?
                                (
                                    <UserList />
                                ) : (index === 2 ?
                                    (
                                        <ThemList />
                                    ) : (index === 3 ?
                                        (
                                            <Files />
                                        ) : (
                                            <ChartItem />
                                        ))))
                        }
                    </div>
                </div>
            ) : <div className='text-lg  sm:text-xl text-center'>
                Bạn không thể truy cập vào trang web này!
                </div>

    )
}

export default Admin;
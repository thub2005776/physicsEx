import { SideBarAdmin, AdminCard, Chart, UserList, ExList, Files } from '../../components'
import { useLocation } from 'react-router';

function Admin() {
    const location = useLocation();
    const path = location.pathname.split('/')[2];
    const index = parseInt(path);

    return (
        <div className="flex justify-between m-5 text-white">
            <div className="fixed w-1/5 bg-[#24252d]">
                <SideBarAdmin active={index} />
            </div>
            <div className='sm:ml-64 w-4/5 p-3'>
                {index === 0 ?
                    (< >
                        <div className='sm:flex ml-28 w-4/5'>
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
    )
}

export default Admin;
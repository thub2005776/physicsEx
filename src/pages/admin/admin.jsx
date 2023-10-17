import { SideBarAdmin, AdminCard, Chart, List } from '../../components'
import { useLocation } from 'react-router';

function Admin() {
    const location = useLocation();
    const path = location.pathname.split('/')[2];
    const index = parseInt(path);

    const headerUser = ["Ảnh bìa", "Tên người dùng", "Email"];
    const headerEx = ["Ảnh bìa", "Mã chuyên đề", "Tên chuyên đề"];
    const headerFile = ["Lớp", "Tên file"];
    return (
        <div className="flex justify-between m-5 text-white">
            <div className="w-1/5 ">
                <SideBarAdmin active={index} />
            </div>
            <div className='w-4/5'>
                {index === 0 ?
                    (< >
                        <div className='flex mx-20 w-4/5'>
                            <AdminCard />
                        </div>
                        <div className=''>
                            <Chart />
                        </div>
                    </>)
                    : (index === 1 ?
                        (
                            <List 
                                />
                        ) : (index === 2 ? (
                            <List />
                        ) : (index === 3 ? (
                            <List />
                        ) : (
                            <Chart />
                        ))))
                }
            </div>
        </div>
    )
}

export default Admin;
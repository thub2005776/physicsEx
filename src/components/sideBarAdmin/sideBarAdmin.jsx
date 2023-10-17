import { AiFillFilePdf } from "react-icons/ai";
import { Link } from "react-router-dom";
import {
    BsFillHouseDoorFill,
    BsFillPersonLinesFill,
    BsFillFileTextFill,
    BsBarChartLineFill
} from "react-icons/bs";

const SideBarAdmin = ({ active }) => {
    const Icon = [
        {
            "title": "Chung",
            "icon":<BsFillHouseDoorFill/>
        },
        {
            "title": "Người dùng",
            "icon":<BsFillPersonLinesFill />
        },
        {
            "title": "Bài tập",
            "icon":<BsFillFileTextFill />
        },
        {
            "title": "Tài liệu",
            "icon":<AiFillFilePdf />
        },
        {
            "title": "Thống kê",
            "icon":<BsBarChartLineFill />
        }
    ];

    const SideBarItem = ({icon, index}) => {
        return (
            <Link to={`/admin/${index}`}>
                <div className={`text-xs sm:text-xl font-bold m-1  p-2 rounded-e-md  
                    ${active === index? "bg-teal-700":'hover:bg-slate-900'}`}>
                    <div className="flex">
                        <div className="mr-3 pt-2"> {icon.icon}</div>
                        <div className="pb-2">{icon.title}</div>
                    </div>
                </div>
            </Link>
        )
    }
    return (
        <>
            {Icon.map((icon, index) => (
                <SideBarItem
                    key={index}
                    icon={icon}
                    index={index}
                />
            ))}
        </>
    )
}

export default SideBarAdmin;
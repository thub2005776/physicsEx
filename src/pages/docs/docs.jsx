import { Link } from "react-router-dom";


function Docs () {
    return (
        <Link to={`/docs/grade12`}>
            <div className="container">
                <p className="text-">Tóm tắt lý thuyết vật lý lớp 12</p>
                
            </div>
        </Link>
    )
}

export default Docs;
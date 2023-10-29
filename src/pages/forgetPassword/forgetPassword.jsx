import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
    const [email, setEmail] = useState();
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(process.env.REACT_APP_SERVER_URL + 'forget-pass', { email })
            .then(res => {
                if(res.data.Status === "Success") {
                     navigate(`/reset-password`)}})
            .catch(err => { console.log(err)})
    }
    return (
        <div className="lg:mx-96 mx-10 mb-5 bg-gray-700 p-2 rounded-lg shadow-md">
            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label htmlFor="email" className="block mb-2 text-md text-white">
                        Nhập địa chỉ Email
                    </label>
                    <input type="email" id="email"
                        className=" border text-sm rounded-lg  block w-full p-2.5 bg-gray-600 border-gray-600  
                            text-white focus:ring-blue-500 focus:border-blue-500" required
                        onChange={(e) => setEmail(e.target.value)} />
                </div>

                <button type="submit"
                    className="text-white   focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full 
                        sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">
                    Gửi
                </button>
            </form>
        </div>
    )
}

export default ForgetPassword;
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserAdd = ({ auth }) => {
    const [admin, setAdmin] = useState(false);
    const [file, setFile] = useState(null);
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      comfirmPassword: ''
    })
  
    const [errors, setErrors] = useState({})
    const validationErrors = {}
    const handleValidation = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData, [name]: value
      })
      
      // Xác thực form 
      
      if (!formData.name.trim()) {
        validationErrors.name = "Bạn phải nhập tên"
      }
  
      if (!formData.email.trim()) {
        validationErrors.email = "Bạn phải nhập email"
      } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(formData.email)) {
        validationErrors.email = "Email không hợp lệ"
      }
  
      if (!formData.password.trim()) {
        validationErrors.password = "Bạn phải nhập mật khẩu"
      } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(formData.password)) {
        validationErrors.password = "Mật khẩu phải có ít nhất 8 ký tự : HOA, thường và đặc biệt"
      }
  
      if (formData.password.substring(0,formData.password.length-1).localeCompare(formData.comfirmPassword.trim()) !== 0) {
        validationErrors.comfirmPassword = "Mật khẩu không khớp"
      }

    //   setEmail(formData.email);
    //   axios.post(process.env.REACT_APP_SERVER_URL + 'exist', { email })
    //   .then(res => {
    //         // alert("Tài khoản đã tồn tại. Hãy xem lại!");
    //         validationErrors.existed = "Email đã tồn tại.";
    //   })
    //   .catch(err => {
    //     console.log(err)
    // })

        setErrors(validationErrors)
        setName(formData.name);
        setEmail(formData.email);
        setPassword(formData.password);
    }
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      if (Object.keys(validationErrors).length === 0) {
        // Post data 
        
        const permission = admin === true? "admin":"user";
        // const img = image !== null? image :'Image.png';
        const data = new FormData();
        data.append("file",file);
        
        const values = {
            "email": email,
            "name": name,
            "password": password,
            "img": file && file.name,
            "permission": permission,
        }
        console.log(values);
        axios.post(process.env.REACT_APP_SERVER_URL + "file/upload", data)
            .then(res => {
                if (res.status === 200) {
                   console.log(res.data);
                }
            })
            .catch(err => console.log(err))

        axios.post(process.env.REACT_APP_SERVER_URL + 'users', values)
          .then(res => {
            alert("Thêm thành công!");
            navigate('/admin/1', { replace: true})
          })
          .catch(err => console.log(err));
      }
    }

    
    return (
        auth && auth.permission === "admin" &&
            (<div className="lg:mx-80 mx-20">
                <div className="sm:text-2xl text-lg text-teal-400 sm:font-bold font-semibold mb-6 text-center">
                    Thông tin tài khoản mới
                </div>
                <form className="bg-gray-800 p-5 border border-gray-400 rounded-md" onSubmit={handleSubmit}>
                    <div className="relative z-0 w-full mb-6 group text-white text-base">
                        <span>Tải hình ảnh lên </span>
                        <input className="ml-4 rounded-lg bg-green-400" type="file"
                            name="file"
                            onChange={(e) => setFile(e.target.files[0])}/>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input
                            type="text"
                            name="name"
                            id="floating_name"
                            className="block py-2.5 px-0 w-full text-lg text-white bg-transparent 
                                border-0 border-b-2 border-gray-300 appearance-none dark:text-white 
                                focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            required 
                            onChange={handleValidation}/>
                        <label
                            htmlFor="floating_name"
                            className="peer-focus:font-medium absolute text-lg text-gray-500 duration-300 
                                    transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 
                                    peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
                                    peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                                    peer-focus:scale-75 peer-focus:-translate-y-6">
                            Tên người dùng
                        </label>
                        {errors.name && <span className="text-xs text-red-600 font-thin">{errors.name}</span>}
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input
                            type="email"
                            name="email"
                            id="floating_email"
                            className="block py-2.5 px-0 w-full text-lg text-white bg-transparent 
                                border-0 border-b-2 border-gray-300 appearance-none focus:outline-none 
                                focus:ring-0 focus:border-blue-600 peer"
                            required 
                            onChange={handleValidation}/>
                        <label
                            htmlFor="floating_email"
                            className="peer-focus:font-medium absolute text-lg text-gray-500 
                                    dark:text-gray-400 duration-300 transform -translate-y-6 
                                    scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 
                                    peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
                                    peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                                    peer-focus:scale-75 peer-focus:-translate-y-6">
                            Email
                        </label>
                        {errors.email && <span className="text-xs text-red-600 font-thin">{errors.email}</span>}
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input
                            type="password"
                            name="password"
                            id="floating_password"
                            className="block py-2.5 px-0 w-full text-lg text-white bg-transparent 
                                border-0 border-b-2 border-gray-300 appearance-none focus:outline-none 
                                focus:ring-0 focus:border-blue-600 peer"
                            required 
                            onChange={handleValidation}/>
                        <label
                            htmlFor="floating_password"
                            className="peer-focus:font-medium absolute text-lg text-gray-500 
                            dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 
                            -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 
                            peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 
                            peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Mật khẩu
                        </label>
                        {errors.password && <span className="text-xs text-red-600 font-thin">{errors.password}</span>}
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input
                            type="password"
                            name="comfirmPassword"
                            id="floating_repeat_password"
                            className="block py-2.5 px-0 w-full text-lg text-white bg-transparent 
                                border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none 
                                focus:ring-0 focus:border-blue-600 peer"
                            required 
                            onChange={handleValidation}/>
                        <label
                            htmlFor="floating_repeat_password"
                            className="peer-focus:font-medium absolute text-lg text-gray-500 
                            dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 
                            -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 
                            peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 
                            peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Nhập lại mật khẩu
                        </label>
                        {errors.comfirmPassword && <span className="text-xs text-red-600 font-thin">{errors.comfirmPassword}</span>}
                    </div>
                    <div className="flex items-center mb-4 text-">
                        <input 
                            id="checkbox-2" 
                            type="checkbox" 
                            value="admin" 
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                            onChange={(e) => setAdmin(e.target.checked)}/>
                        <label 
                            htmlFor="checkbox-2" 
                            className={`ml-2 text-sm ${admin? "text-green-400":"text-gray-600"}`}>
                                Admin
                            </label>
                    </div>
                    <button
                        type="submit"
                        className="text-white bg-green-400 hover:bg-green-600 focus:ring-4 
                            focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm 
                            w-full sm:w-auto px-5 py-2.5 text-center">
                        Thêm
                    </button>
                </form>
            </div>
            )
    )
}

export default UserAdd;
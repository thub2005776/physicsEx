import { useEffect, useState } from 'react';
import './App.css';
import {Navbar,Footer, SearchBar} from './components'
import {Home,Login,Register, User, Thematics, Exercises, Docs, Detail} from './pages'
import { Routes, Route } from "react-router-dom";
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(process.env.REACT_APP_SERVER_URL + "auth/login/success")
        .then(res => {
          console.log(res);
          
        }).catch(err => {
          console.log(err);
        })

    // const getUsers = async () => {
    //   fetch(process.env.REACT_APP_SERVER_URL + "auth/login/success", {
    //     method: "GET",
    //     credentials: "include",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //       "Access-Control-Allow-Credenttials": true,
    //     },
    //   }).then((res) => {
    //     if(res.status === 200) return res.json();
    //     throw new Error("Xác thực thất bại")
    //   }).then(reObject => {setUser(reObject.user);
    //   }).catch((err) => {
    //     console.log(err);
    //   });
    // };
    // getUsers();

    // console.log(user);
  },[])
 
  return (
    <div>
      <Navbar user={user}/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/searchbar" element={<SearchBar />} />
            {/* <Route path=":item/:id" element={<Item />} />
            <Route path="/create" element={<Create /> } />
            <Route path="/profile/:id" element={<Profile />} /> */}
            <Route path="/login" element={ <Login />} />
            <Route path="/register" element={ <Register />} />
            <Route path="/thematics" element={<Thematics />} />
            <Route path="/getUsers" element={<User />} />
            <Route path="/exercises" element={<Exercises />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/docs" element={<Docs />} />
            {/* Thêm path cho admin */}
          </Routes>
      <Footer />
    </div>
  );
}

export default App;

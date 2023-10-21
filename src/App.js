import { useEffect, useState } from 'react';
import './App.css';

import {Navbar,Footer} from './components'
import {Home, SearchBar, Login, Register, Thematics, 
        Exercises, Docs, Detail, Admin, UserAdd,
        ThematicAdd, ExAdd, FileAdd, Profile
      } from './pages'
import { Routes, Route} from "react-router-dom";
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);

  axios.defaults.withCredentials = true;
  useEffect(() => {
      axios.get(process.env.REACT_APP_SERVER_URL + "token")
        .then(res => {
          // console.log("res: "+res.data.name);
          if(res.data.Status === "Success") {
            setUser(res.data.name);
          }
          
        }).catch(err => console.log(err));
    
  }, []);

    // Callback function để nhận thông tin profile từ component Login
    const handleLoginSuccess = (profileData) => {
      setUser(profileData);
    };

    const [profile, setProfile] = useState([]);
    useEffect(() => {
        axios.post(process.env.REACT_APP_SERVER_URL + 'profile')
            .then(res => {
                setProfile(res.data);
                // console.log(res.data);
            })
            .catch(err => console.log(err))
    }, []);

    const info = profile.find((p) => p.email === user);

  // console.log("user:",user);
  return (
    <div>
      <Navbar auth={info}/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/searchbar" element={<SearchBar />} />
            {/* <Route path=":item/:id" element={<Item />} /> */}
            {/* <Route path="/create" element={<Create /> } /> */}
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/login" element={ <Login handleLoginSuccess={handleLoginSuccess} />} />
            <Route path="/register" element={ <Register />} />
            <Route path="/thematics" element={<Thematics />} />
            <Route path="/exercises" element={<Exercises />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/admin/:id" element={<Admin auth={info}/>} />
            <Route path="/admin/1/add" element={<UserAdd auth={info}/>} />
            <Route path="/admin/2/themAdd" element={<ThematicAdd auth={info}/>} />
            <Route path="/admin/2/exAdd/:id" element={<ExAdd auth={info}/>} />
            <Route path="/admin/3/add/:id" element={<FileAdd auth={info}/>} />
          </Routes>
      <Footer />
    </div>
  );
}

export default App;

import { useEffect, useState } from 'react';
import './App.css';

import {Navbar,Footer} from './components'
import {Home, SearchBar, Login, Register, Thematics, 
        Exercises, Docs, Detail, Admin, UserAdd,
        ThematicAdd} from './pages'
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

  // console.log("user:",user);
  return (
    <div>
      <Navbar auth={user}/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/searchbar" element={<SearchBar />} />
            {/* <Route path=":item/:id" element={<Item />} />
            <Route path="/create" element={<Create /> } />
            <Route path="/profile/:id" element={<Profile />} /> */}
            <Route path="/login" element={ <Login handleLoginSuccess={handleLoginSuccess} />} />
            <Route path="/register" element={ <Register />} />
            <Route path="/thematics" element={<Thematics />} />
            <Route path="/exercises" element={<Exercises />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/admin/:id" element={<Admin auth={user}/>} />
            <Route path="/admin/1/uform" element={<UserAdd auth={user}/>} />
            <Route path="/admin/2/them" element={<ThematicAdd auth={user}/>} />
          </Routes>
      <Footer />
    </div>
  );
}

export default App;

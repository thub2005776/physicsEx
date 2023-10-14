import { useEffect, useState } from 'react';
import './App.css';
import {Navbar,Footer, SearchBar} from './components'
import {Home,Login,Register, Thematics, Exercises, Docs, Detail, Admin} from './pages'
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
    
    
      // axios
      //   .get(process.env.REACT_APP_SERVER_URL + 'auth/login/success')
      //   .then((res) => {
      //     console.log(res);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
  }, []);
  // console.log("user:",user);
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
            <Route path="/exercises" element={<Exercises />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
      <Footer />
    </div>
  );
}

export default App;

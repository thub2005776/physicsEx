import { useEffect, useState } from 'react';
import './App.css';
import {Navbar,Footer, SearchBar} from './components'
import {Home,Login,Register, User, Thematics, Exercises, Docs, Detail, Admin} from './pages'
import { Routes, Route, useLocation } from "react-router-dom";
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.user) {
      setUser(location.state.user.name);
    } else {
      axios
        .get(process.env.REACT_APP_SERVER_URL + 'auth/login/success')
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [location]);
 
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
            <Route path="/admin" element={<Admin />} />
          </Routes>
      <Footer />
    </div>
  );
}

export default App;

import { useEffect, useState } from 'react';
import './App.css';

import { Navbar, Footer } from './components'
import {
  Home, SearchBar, Login, Register, Thematics,
  Exercises, Docs, Detail, Admin, UserAdd,
  ThematicAdd, ThemEdit, ExAdd, ExEdit, FileAdd,
  FileEdit, Profile, ExView, ExOfThem
} from './pages'
import { Routes, Route } from "react-router-dom";
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState([]);
  const [thematics, setThematics] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [files, setFiles] = useState([]);

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get(process.env.REACT_APP_SERVER_URL + "token")
      .then(res => {
        if (res.data.Status === "Success") {
          setUser(res.data.name);
        }

      }).catch(err => console.log(err));

      //get profile
      axios.post(process.env.REACT_APP_SERVER_URL + 'profile')
      .then(res => {
        setProfile(res.data);
      })
      .catch(err => console.log(err))

       //get thematics
      axios.get(process.env.REACT_APP_SERVER_URL + "thematics")
      .then(thematics => setThematics(thematics.data))
      .catch(err => console.log(err))

      //get exercises
      axios.get(process.env.REACT_APP_SERVER_URL + "exercises")
      .then(exercises => setExercises(exercises.data))
      .catch(err => console.log(err))

      //get document files 
      axios.get(process.env.REACT_APP_SERVER_URL + "docs")
      .then(res => setFiles(res.data))
      .catch(err => console.log(err))
  }, []);

  // Callback function để nhận thông tin profile từ component Login
  const handleLoginSuccess = (profileData) => {
    setUser(profileData);
  };



  const info = profile  && profile.find((p) => p.email === user);

  return (
    <div>
      <Navbar auth={info} />
      <Routes>
        <Route path="/" element={<Home thematics={thematics} exercises={exercises}/>} />
        <Route path="/searchbar" element={<SearchBar thematic={thematics} exercise={exercises} />} />
        <Route path="/profile/:id" element={<Profile auth={info} />} />
        <Route path="/login" element={<Login handleLoginSuccess={handleLoginSuccess} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/thematics" element={<Thematics thematics={thematics} exercises={exercises}/>} />
        <Route path="/thematics/:id" element={<ExOfThem thematics={thematics} exercises={exercises} />} />
        <Route path="/exercises" element={<Exercises exercises={exercises} />} />
        <Route path="/detail/:id" element={<Detail user={info} exercises={exercises} />} />
        <Route path="/docs" element={<Docs files={files} />} />
        <Route path="/admin/:id" element={<Admin
          auth={info} users={profile} thematics={thematics} exercises={exercises} files={files}
        />} />
        <Route path="/admin/1/add" element={<UserAdd auth={info} />} />
        <Route path="/admin/2/themAdd" element={<ThematicAdd auth={info} thematics={thematics} />} />
        <Route path="/admin/2/edit/:id/:id" element={<ThemEdit auth={info} thematics={thematics} />} />
        <Route path="/admin/2/them/:id" element={<ExView auth={info} exercises={exercises} />} />
        <Route path="/admin/2/add/:id/:id" element={<ExAdd auth={info} />} />
        <Route path="/admin/2/edit/:id" element={<ExEdit auth={info} exercises={exercises} />} />
        <Route path="/admin/3/add/:id/:id" element={<FileAdd auth={info} />} />
        <Route path="/admin/3/edit/:id/:id" element={<FileEdit auth={info} docs={files} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

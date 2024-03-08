import { useEffect, useState } from 'react';
import './App.css';

import { Navbar, Footer } from './components'
import {
  Home, SearchBar, Login, Register, Thematics,
  Exercises, Docs, Detail, Profile, ExOfThem, Courses, Tests
} from './pages'
import { Routes, Route } from "react-router-dom";
import axios from 'axios';


function App() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState([]);
  const [thematics, setThematics] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [files, setFiles] = useState([]);
  const [com, setCom] = useState([]);
  const [courses, setCourses] = useState([]);
  const [tests, setTests] = useState([]);


  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get(process.env.REACT_APP_SERVER_URL + "log/u/token")
      .then(res => {
        if (res.data.Status === "Success") {
          setUser(res.data.email);
        }
      })
      .catch(err => console.log(err));

    // get profile
    axios.get(process.env.REACT_APP_SERVER_URL + 'users')
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

    axios.get(process.env.REACT_APP_SERVER_URL + "comments")
      .then(res => setCom(res.data))
      .catch(err => console.log(err))

    axios.get(process.env.REACT_APP_SERVER_URL + "courses")
      .then(res => setCourses(res.data))
      .catch(err => console.log(err))

    axios.get(process.env.REACT_APP_SERVER_URL + "tests")
      .then(res => setTests(res.data))
      .catch(err => console.log(err))
  }, []);


  // Callback function để nhận thông tin profile từ component Login
  const handleLoginSuccess = (profileData) => {
    setUser(profileData);
  };

  const info = profile && profile.find((p) => p.email === user);

  return (
    <div>
      <Navbar auth={info} />
      <Routes>
        <Route path="/" element={<Home thematics={thematics} exercises={exercises} />} />
        <Route path="/searchbar" element={<SearchBar thematic={thematics} exercise={exercises} />} />
        <Route path="/profile/:id" element={<Profile auth={info} />} />
        <Route path="/login" element={<Login handleLoginSuccess={handleLoginSuccess} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/thematics" element={<Thematics thematics={thematics} exercises={exercises} />} />
        <Route path="/thematics/:id" element={<ExOfThem thematics={thematics} exercises={exercises} />} />
        <Route path="/exercises" element={<Exercises exercises={exercises} />} />
        <Route path="/detail/:id" element={<Detail auth={info} user={profile} exercises={exercises} com={com} />} />
        <Route path="/docs" element={<Docs files={files} user={info} com={com} />} />
        <Route path="/courses" element={<Courses auth={info} courses={courses}/>} />
        <Route path="/tests" element={<Tests auth={info} tests={tests}/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

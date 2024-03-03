import { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";

import axios from 'axios';
import './App.css';

import { Navbar } from './components';

import {
  Admin, UserAdd,
  ThematicAdd, ThemEdit, ExAdd, ExEdit, FileAdd,
  FileEdit, Profile, ExView, Login, CourseAdd, 
  CourseEdit, TestAdd, QuestionsList, TestEdit
} from './pages'

function App() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState([]);
  const [thematics, setThematics] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [files, setFiles] = useState([]);
  const [com, setCom] = useState([]);
  const [courses, setCourses] = useState([]);
  const [tests, setTests] = useState([]);
  const [questions, setQuestions] = useState([]);

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get(process.env.REACT_APP_SERVER_URL + "log/ad/token")
      .then(res => {
        if (res.data.Status === "Success") {
          setUser(res.data.email);
        }

      }).catch(err => console.log(err));

    //get profile
    axios.get(process.env.REACT_APP_SERVER_URL + 'users')
      .then(res => setProfile(res.data))
      .catch(err => console.log(err))


    //get thematics
    axios.get(process.env.REACT_APP_SERVER_URL + "thematics")
      .then(res => setThematics(res.data))
      .catch(err => console.log(err))

    //get exercises
    axios.get(process.env.REACT_APP_SERVER_URL + "exercises")
      .then(res => setExercises(res.data))
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

      axios.get(process.env.REACT_APP_SERVER_URL + "questions")
      .then(res => setQuestions(res.data))
      .catch(err => console.log(err))
  }, []);

  // Callback function để nhận thông tin profile từ component Login
  const handleLoginSuccess = (profileData) => {
    setUser(profileData);
  };

  const info = profile && profile.find((p) => p.email === user);
  return (
    <div className="App">
      <div className="">
        <Navbar auth={info} com={com} />
        <Routes>
          <Route path="/" element={<Login handleLoginSuccess={handleLoginSuccess} />} />
          <Route path="/admin/:id"
            element={<Admin
              auth={info}
              users={profile}
              thematics={thematics}
              exercises={exercises}
              files={files}
              com={com}
              courses={courses}
              tests={tests}
            />} />
          <Route path="/profile/:id" element={<Profile auth={info} />} />
          <Route path="/admin/1/add" element={<UserAdd auth={info} />} />
          <Route path="/admin/2/themAdd" element={<ThematicAdd auth={info} thematics={thematics} />} />
          <Route path="/admin/2/edit/:id/:id" element={<ThemEdit auth={info} thematics={thematics} />} />
          <Route path="/admin/2/them/:id" element={<ExView auth={info} exercises={exercises} />} />
          <Route path="/admin/2/add/:id/:id" element={<ExAdd auth={info} />} />
          <Route path="/admin/2/edit/:id" element={<ExEdit auth={info} exercises={exercises} />} />
          <Route path="/admin/3/add/:id/:id" element={<FileAdd auth={info} />} />
          <Route path="/admin/3/edit/:id/:id" element={<FileEdit auth={info} docs={files} />} />
          <Route path="/admin/4/add" element={<CourseAdd auth={info} />} />
          <Route path="/admin/4/:id" element={<CourseEdit auth={info} courses={courses} />} />
          <Route path="/admin/5/add" element={<TestAdd auth={info} />} />
          <Route path="/admin/5/add/:id" element={<QuestionsList auth={info} />} />
          <Route path="/admin/5/:id" element={<TestEdit auth={info} tests={tests} questions={questions}/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

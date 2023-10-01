import './App.css';
import {Navbar,Footer} from './components'
import {Home,Profile,Item, Create,Login,Register, User, Thematics, Exercises} from './pages'
import { Routes, Route } from "react-router-dom";

function App() {

  return (
    <div>
      <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path=":item/:id" element={<Item />} />
            <Route path="/create" element={<Create /> } />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/login" element={ <Login />} />
            <Route path="/register" element={ <Register />} />
            
            <Route path="/thematics" element={<Thematics />} />
            <Route path="/getUsers" element={<User />} />
            <Route path="/exercises" element={<Exercises />} />
            {/* Thêm path cho admin */}
          </Routes>
      <Footer />
    </div>
  );
}

export default App;

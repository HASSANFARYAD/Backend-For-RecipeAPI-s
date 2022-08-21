import { BrowserRouter as Router, Routes,Route,Link } from 'react-router-dom';
import Home from './pages/home/home';
import About from './pages/about/about';
import Dictionary from './pages/dictionary/dictonary';
import ProjectHealth from './pages/projecthealth/projecthealth';
import Header from './components/Header/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Register from './pages/register/register';
import Allblogs from "./pages/allBlogs/allblogs"
import Login from './pages/login/login';
import  SingleBlog  from './pages/singleBlog/singleBlog';
import UpdateBlogForm from "./components/blogsForm/blogUpdateForm";
import NewBlog from "./pages/newBlog/newBlog";

function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        {/* <Link to="/register">Register</Link>
        <Link to="/login">Login</Link> */}
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path='/dictionary-definition' element={<Dictionary/>}/>
          <Route path="/project-health" element={<ProjectHealth/>}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/allBlogs" element={<Allblogs/>}/>
          <Route path="/:id" element={<SingleBlog/>}/>
          <Route path="/updateBlog" element={<UpdateBlogForm/>}/>
          <Route path="/newBlog" element={<NewBlog/>}/>
        </Routes>
        <footer>Copyright © 2022 Data as a Second Language®</footer>
        <ToastContainer/>
      </Router>
    </div>
  );
}

export default App;

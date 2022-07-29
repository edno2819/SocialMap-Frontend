import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Home from './pages/Home';
import Singin from './pages/Signin';
import Singup from './pages/Signup';
import NewPost from './pages/NewPost';
import PostDetail from './pages/PostDetail';
import Profile from './pages/Profile';
import Profiles from './pages/Profiles';




import './App.css';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Routes>
        <Route path='/' element={<Singin />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/posts/:postId' element={<PostDetail />}></Route>
        <Route path='/register' element={<Singup />}></Route>
        <Route path='/create' element={<NewPost />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
        <Route path='/profiles' element={<Profiles />}></Route>

      </Routes>
    </BrowserRouter>


  );
}

export default App;
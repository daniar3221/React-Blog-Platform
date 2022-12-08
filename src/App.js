import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { PostsPage } from './pages/postsPage/postsPage';
import { singlePostLoader, SinglePostPage } from './pages/singlePostPage/singlePostPage';
import { CreateAccountPage } from './pages/createAccountPage/createAccountPage';
import { SignInPage } from './pages/signInPage/signInPage';
import { Layout } from './components/layout.jsx'
import { RouterProvider } from 'react-router-dom';
import { NoFoundPage } from './pages/notFoundPage/notFoundPage';
import { CreateArticlePage } from './pages/createArticle/createArticlePage';
import { EditUserProfile } from './pages/editUserProfile/editUserProfile';

import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
  const [userProfile, setUserProfile] = useState({
    email: '',
    token: '',
    username: '',
    image: 'https://ru-static.z-dn.net/files/d49/4e14a49654a619ae0b35890facd537ec.jpeg',
    password: '',
    bio: ''
  })

  useEffect(() => {
    if (!sessionStorage.getItem('token')) return
    fetch(`https://blog.kata.academy/api/user`,
    {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Token ${sessionStorage.getItem('token')}`
        },
    })
    .then((res) => res.json())
    .then((user) => {
      setUserProfile((prevState) => (
        {
          ...prevState,
          ...user.user
        }
      ))
      setIsUserLoggedIn(true)
} )
    
  },[])

  
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Layout userProfile={userProfile}
                                      isUserLoggedIn ={isUserLoggedIn}
                                      setIsUserLoggedIn = {setIsUserLoggedIn}/>}>
    <Route path='posts' element={<PostsPage/>}/>
    <Route path='posts/:slug' element={<SinglePostPage/>} loader={singlePostLoader}/>
    <Route path='create-account' element={<CreateAccountPage/>}/>
    <Route path='sign-in' element={<SignInPage setUserProfile={setUserProfile} 
                                              setIsUserLoggedIn={setIsUserLoggedIn}/>}/>
    <Route path='edit-profile' element={<EditUserProfile userProfile={userProfile} 
    setUserProfile ={setUserProfile}/>} />
    
    <Route path='create-article' element={<CreateArticlePage />}/>
    <Route path='*' element={<NoFoundPage/>}/>
  </Route>
  ))

  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;

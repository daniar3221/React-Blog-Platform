import React from 'react';
import {Link, Outlet, useNavigate} from 'react-router-dom';


export const Layout = ({userProfile, isUserLoggedIn, setIsUserLoggedIn}) => {
  const navigate = useNavigate();


  return (
    <>
      <header>
        <Link className='realworld_logo' to={'/'}>Realworld Blog</Link>

        {
                    isUserLoggedIn ?
                        <div className='header_user_account'>
                          <Link to='create-article'>
                            <button className='create_article'>Create article</button>
                          </Link>
                          <Link to='/edit-profile'>
                            <h3>{userProfile.username}</h3>
                          </Link>
                          {userProfile.image ? <img src={userProfile.image} alt="user_img" /> : null}

                          <button className='log_out' onClick={() => {
                            sessionStorage.removeItem('token');
                            setIsUserLoggedIn(false);
                            return navigate('/sign-in');
                          }}>Log Out</button>
                        </div> :
                        <div className='account_auth'>
                          <Link to='/sign-in' className='sign_in_btn'>Sign In</Link>
                          <Link to='/create-account' className='sign_up_btn'>Sign Up</Link>
                        </div>
        }

      </header>

      <Outlet />
    </>
  );
};

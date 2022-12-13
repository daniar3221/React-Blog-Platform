/* eslint-disable no-useless-escape */
import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {registerUser} from '../../services';
import './createAccountPage.css';

export const CreateAccountPage = ({setIsAccRegistrated}) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [agreeCheckbox, setAgreeCheckbox] = useState(false);

  const [userNameDirty, setUserNameDirty] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [repeatPasswordDirty, setRepeatPasswordDirty] = useState(false);

  const [userNameError, setUserNameError] = useState('Username shouldn\'t be empty');
  const [emailError, setEmailError] = useState('Email shouldn\'t be empty');
  const [passwordError, setPasswordError] = useState('Password shouldn\'t be empty');
  const [repeatPasswordError, setRepeatPasswordError] = useState('Password shouldn\'t be empty');

  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (userNameError || emailError || passwordError || repeatPasswordError || !agreeCheckbox) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [userNameError, emailError, passwordError, repeatPasswordError, agreeCheckbox]);

  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'username':
        setUserNameDirty(true);
        break;
      case 'email':
        setEmailDirty(true);
        break;
      case 'password':
        setPasswordDirty(true);
        break;
      case 'repeat-password':
        setRepeatPasswordDirty(true);
        break;
      default:
        return;
    }
  };

  const onUserChange = (e) => {
    setUsername(e.target.value);
    if (e.target.value.length < 4 || e.target.value.length > 20) {
      setUserNameError('Username must consist of 4 to 20 characters.');
      if (!e.target.value) {
        setUserNameError('Username shouldn\'t be empty');
      }
    } else {
      setUserNameError('');
    }
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!e.target.value) {
      setEmailError('Email shouldn\'t be empty');
    } else if (!re.test(String(e.target.value).toLocaleLowerCase())) {
      setEmailError('Invalid email');
    } else {
      setEmailError('');
    }
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 6 || e.target.value.length > 40) {
      setPasswordError('Password must consist of 6 to 40 characters.');
      if (!e.target.value) {
        setPasswordError('Password shouldn\'t be empty');
      }
    } else {
      setPasswordError('');
    }
  };

  const onRepeatPasswordChange = (e) => {
    setRepeatPassword(e.target.value);
    if (e.target.value !== password) {
      setRepeatPasswordError('Passwords must match');
    } else {
      setRepeatPasswordError('');
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await registerUser(username, email, password);
    if (res['user']) {
      return navigate('/sign-in');
    } else {
      const {errors} = res;
      if (errors.username) {
        setUserNameError(`This username ${errors.username}`);
      }
      if (errors.email) {
        setEmailError(`This email ${errors.email}`);
      }
    }
  };

  return (
    <div className='create-account-page'>
      <form className='sign-in-form' onSubmit={onSubmit} autoComplete='off'>
        <h1>Create new account</h1>
        <div>
          <label htmlFor="username-input">Username</label>
          <input name='username'
            autoComplete='new-password'
            value={username}
            onChange={(e) => onUserChange(e)}
            onBlur={(e) => blurHandler(e)}
            id='username-input'
            type="text"
            placeholder='Username' />
          {(userNameDirty && userNameError) && <div style={{color: 'red'}}>{userNameError}</div>}
        </div>
        <div>


          <label htmlFor="email-input">Email</label>
          <input name='email'
            onChange={(e) => onEmailChange(e)}
            value={email}
            onBlur={(e) => blurHandler(e)}
            id='email-input'
            type="text"
            placeholder='Email' />
          {(emailDirty && emailError) && <div style={{color: 'red'}}>{emailError}</div>}
        </div>

        <div>
          <label htmlFor="password-input">Password</label>
          <input name='password'
            onChange={(e) => onPasswordChange(e)}
            value={password}
            onBlur={(e) => blurHandler(e)}
            autoComplete='false'
            id='password-input'
            type="password"
            placeholder='Password' />
          {(passwordDirty && passwordError) && <div style={{color: 'red'}}>{passwordError}</div>}
        </div>

        <div>
          <label htmlFor="repeat-password-input">Repeat Password</label>
          <input name='repeat-password'
            onChange={(e) => onRepeatPasswordChange(e)}
            autoComplete='false'
            value={repeatPassword}
            onBlur={(e) => blurHandler(e)}
            id='repeat-password-input'
            type="password"
            placeholder='Password' />
          {(repeatPasswordDirty && repeatPasswordError) && <div style={{color: 'red'}}>{repeatPasswordError}</div>}
        </div>

        <hr />
        <div className='agree-box'>
          <input onClick={() => setAgreeCheckbox((prevState) => !prevState)} type='checkbox' className='agree-checkbox' id='agree-checkbox' />
          <label htmlFor="agree-checkbox" className='agree-label'>I agree to the processing of    {'     '}my personal
                        information</label>


        </div>


        <button disabled={!formValid}>Create</button>
        <p>Already have an account? <Link to={'/sign-in'}>Sign in</Link>.</p>

      </form>
    </div>
  );
};

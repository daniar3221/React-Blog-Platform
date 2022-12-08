/* eslint-disable no-useless-escape */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logInUser } from '../../services';
import './signInPage.css'

export const SignInPage = ({ setUserProfile, setIsUserLoggedIn }) => {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [emailDirty, setEmailDirty] = useState(false)
    const [passwordDirty, setPasswordDirty] = useState(false)

    const [emailError, setEmailError] = useState("Email shouldn't be empty")
    const [passwordError, setPasswordError] = useState("Password shouldn't be empty")

    const [formValid, setFormValid] = useState(false)

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true)
                break
            case 'password':
                setPasswordDirty(true)
                break
            default:
                return
        }
    }

    const onEmailChange = (e) => {
        setEmail(e.target.value)
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!e.target.value) {
            setEmailError("Email shouldn't be empty")
        }
        else if (!re.test(String(e.target.value).toLocaleLowerCase())) {
            setEmailError('Invalid email')
        } else {
            setEmailError('')
        }
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value)
        if (e.target.value.length < 6) {
            setPasswordError('Your password needs to be at least 6 characters.')
            if (!e.target.value) {
                setPasswordError("Password shouldn't be empty")
            }
        } else {
            setPasswordError('')
        }
    }

    useEffect(() => {
        if (emailError || passwordError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [emailError, passwordError])

    const onSubmit = async (e) => {
        e.preventDefault()
        const res = await logInUser(email, password)
        if (res['user']) {
            setUserProfile((prevState) => {
                return {
                    ...prevState,
                    username: res.user.username,
                    token: res.user.token,
                    email: res.user.email,
                    password: password
                }
            })
            setIsUserLoggedIn(true)
            sessionStorage.setItem('token', res.user.token)
            return navigate('/posts')
        } else {
            setPasswordError("Email or password are wrong")
            setEmailError("Email or password are wrong")
        }
    }


    return (
        <div className='sign-in-page'>
            <form className='sign-in-form' autoComplete='off' onSubmit={onSubmit}>
                <h1>Sign In</h1>

                <div>
                    <label htmlFor="email-input">Email address</label>
                    <input id='email-input'
                        value={email}
                        name='email'
                        onChange={onEmailChange}
                        onBlur={blurHandler}
                        type="text"
                        placeholder='Email address' />
                    {(emailDirty && emailError) && <div style={{ color: 'red' }}>{emailError}</div>}
                </div>

                <div>
                    <label htmlFor="password-input">Password</label>
                    <input autoComplete='off'
                        name='password'
                        value={password}
                        onChange={onPasswordChange}
                        onBlur={blurHandler}
                        id='password-input'
                        type="password" placeholder='Password' />
                    {(passwordDirty && passwordError) && <div style={{ color: 'red' }}>{passwordError}</div>}
                </div>

                <button disabled={!formValid}>Login</button>
                <p>Don't have an account? <Link to={'/create-account'}>Sign up</Link>.</p>

            </form>
        </div>
    )
}

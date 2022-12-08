/* eslint-disable no-useless-escape */
import React, { useState, useEffect } from 'react';
import './editUserProfile.css'
import { updateUserInfo } from '../../services';
import { useNavigate } from 'react-router-dom';

export const EditUserProfile = ({ userProfile, setUserProfile }) => {
    const navigate = useNavigate()

    const [username, setUsername] = useState(userProfile.username)
    const [email, setEmail] = useState(userProfile.email)
    const [password, setPassword] = useState(userProfile.password)
    const [imgURL, setImgURL] = useState(userProfile.image)

    const [usernameDirty, setUsernameDirty] = useState(false)
    const [emailDirty, setEmailDirty] = useState(false)
    const [passwordDirty, setPasswordDirty] = useState(false)
    const [imgURLDirty, setImgURLDirty] = useState(false)


    const [usernameError, setUsernameError] = useState("Username shouldn't be empty")
    const [emailError, setEmailError] = useState("Email shouldn't be empty")
    const [passwordError, setPasswordError] = useState("Password shouldn't be empty")
    const [imgURLError, setImgURLError] = useState('Invalid URL')

    const [formValid, setFormValid] = useState(false)

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true)
                break
            case 'password':
                setPasswordDirty(true)
                break
            case 'username':
                setUsernameDirty(true)
                break
            case 'imgURL':
                setImgURLDirty(true)
                break
            default:
                return
        }
    }

    const onUserChange = (e) => {
        setUsername(e.target.value)
        if (e.target.value.length < 4 || e.target.value.length > 20) {
            setUsernameError('Username must consist of 4 to 20 characters.')
            if (!e.target.value) {
                setUsernameError("Username shouldn't be empty")
            }
        } else {
            setUsernameError('')
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
        if (e.target.value.length < 6 || e.target.value.length > 40) {
            setPasswordError('Password must consist of 6 to 40 characters.')
            if (!e.target.value) {
                setPasswordError("Password shouldn't be empty")
            }
        } else {
            setPasswordError('')
        }
    }

    const onImgURLChange = (e) => {
        setImgURL(e.target.value)
        const urlRE = new RegExp('^(https?:\\/\\/)?' +
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
            '((\\d{1,3}\\.){3}\\d{1,3}))' +
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
            '(\\?[;&a-z\\d%_.~+=-]*)?' +
            '(\\#[-a-z\\d_]*)?$', 'i');
        if (!e.target.value) {
            setImgURLError('')
        }
        else if (!urlRE.test(String(e.target.value).toLowerCase())) {
            console.log(e.target.value);
            setImgURLError('Invalid URL')
        } else {
            setImgURLError('')
        }
    }

    useEffect(() => {
        setEmailError(false)
        setUsernameError(false)
        setImgURLError(false)
        setPasswordError(false)
    }, [])

    useEffect(() => {
        if (emailError || passwordError || usernameError || imgURLError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [emailError, passwordError, usernameError, imgURLError])

    const onSubmit = async (e) => {
        e.preventDefault()
        const res = await updateUserInfo(userProfile.token, email, password, username, imgURL)
        if (res['user']) {
            setUserProfile((prevState) => (
                {
                    ...prevState,
                    username: res.user.username,
                    email: res.user.username,
                    image: res.user.image
                }
            ))
            return navigate('/posts')
        } else {
            const { errors } = res
            if (errors.username) {
                setUsernameError(`This username ${errors.username}`)
            }
            if (errors.email) {
                setEmailError(`This email ${errors.email}`)
            }
        }

    }


    return (
        <div className='sign-in-page'>
            <form className='sign-in-form' autoComplete='off' onSubmit={onSubmit}>
                <h1>Edit Profile</h1>

                <div>
                    <label htmlFor="username-input">Username</label>
                    <input name='username'
                        autoComplete='new-password'
                        value={username}
                        onChange={e => onUserChange(e)}
                        onBlur={e => blurHandler(e)}
                        id='username-input'
                        type="text"
                        placeholder='Username' />
                    {(usernameDirty && usernameError) && <div style={{ color: 'red' }}>{usernameError}</div>}
                </div>

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
                    <label htmlFor="password-input">New password</label>
                    <input autoComplete='off'
                        name='password'
                        value={password}
                        onChange={onPasswordChange}
                        onBlur={blurHandler}
                        id='password-input'
                        type="password" placeholder='New password' />
                    {(passwordDirty && passwordError) && <div style={{ color: 'red' }}>{passwordError}</div>}
                </div>

                <div>
                    <label htmlFor="imgURL-input">Avatar image (url)</label>
                    <input name='imgURL'
                        autoComplete='new-password'
                        value={imgURL}
                        onChange={e => onImgURLChange(e)}
                        onBlur={blurHandler}
                        id='imgURL-input'
                        type="text"
                        placeholder='Avatar image' />
                    {(imgURLDirty && imgURLError) && <div style={{ color: 'red' }}>{imgURLError}</div>}
                </div>

                <button disabled={!formValid}>Save</button>


            </form>
        </div>
    )
}
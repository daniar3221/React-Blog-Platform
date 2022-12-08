export const registerUser = async (username, email, password) => {
    const res = await fetch(`https://blog.kata.academy/api/users`,
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            user: {
                username: username, 
                email: email, 
                password: password
            }
        }),
    })
    const result = await res.json()
    return result
}


export const logInUser = async (email, password) => {
    const res = await fetch(`https://blog.kata.academy/api/users/login`,
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            user: {
                email: email, 
                password: password
            }
        }),
    })
    const result = await res.json()
    return result
}



export const updateUserInfo = async (token, email, password, username, image) => {
    const bio = ''
    const res = await fetch(`https://blog.kata.academy/api/user`,
    {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify({
            user: {
                email: email, 
                password: password,
                username: username,
                bio: bio,
                image: image
            }
        }),
    })
    const result = await res.json()
    return result
}

// export const getCurrentUser = async (token) => {
//     const res = await fetch(`https://blog.kata.academy/api/user`,
//     {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json;charset=utf-8',
//             'Authorization': `Token ${token}`
//         },
//     })

//     return res.json()
// }
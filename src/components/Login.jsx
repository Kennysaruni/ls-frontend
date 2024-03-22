import React, { useEffect, useState } from 'react'
import './Login.css'
import API_BASE_URL from '../utilities/env'

function Login() {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [user,setUser] = useState([])
    const [details,setDetails] = useState([])

    function handleLogin(e){
        e.preventDefault()

        fetch(`${API_BASE_URL}/login`,{
            method: 'POST',
            headers :{
                'Content-Type':'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({username,password})
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            localStorage.setItem('jwt',data.jwt)
            setUser(data.user)
        })
        .catch(error => console.error('Error',error))
    }

    useEffect(() => {
        const token = localStorage.getItem('jwt')
        fetch(`${API_BASE_URL}/profile`,{
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setDetails(data)
        } )
    },[])
  
  return (
    <div className='form-container'>
        <h1>Welcome {details.username}</h1>
        <h1 className="title">Log in to Short.ly</h1>
        <form onSubmit={handleLogin} >
            <div className="input-group">
            <label htmlFor="username"> Username
             <input type="text" className='input-block'  placeholder='Enter your username' id='username' onChange={e => setUsername(e.target.value)}/>
            </label>
            <label htmlFor="password"> Password
             <input type="password" className='input-block'  placeholder='Password' id='password' onChange={e => setPassword(e.target.value)} />
            </label>
            </div>
            <button className="submit" type='submit'>Log in</button>
        </form>
    </div>
  )
}

export default Login
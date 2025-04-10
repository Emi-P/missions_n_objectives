import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
import { loginUser } from '../api/user';

export default function Login() {
    const userIsAuthenticated = localStorage.getItem('token') !== null;
    if (userIsAuthenticated) {
        return <Navigate to="/dashboard" />;
    }
    const [isLoading, setIsLoading] = useState(false);

    async function onClickLogin(e) {
        e.preventDefault()
        if (isLoading) {
            console.log('Please wait Loading...')
        }
        else {
            setIsLoading(true)
            const res = await loginUser(e.target.username.value, e.target.password.value)
            if (res.status === 200) {
                localStorage.setItem('token', res.data.token);
                window.location.href = '/dashboard';
            }
            else (alert('Invalid login credentials'))
            setIsLoading(false)
        }
    }

    return (
        <div className='Login'>
            <h1 className='text-4xl'>Login</h1>
            <div className='px-[20rem]'>
                <form onSubmit={onClickLogin} >
                    <div className='flex flex-col space-y-4'>
                        <label htmlFor='username'>Username</label>
                        <input type='text' id='username' name='username' className='text-[black]' />
                        <label htmlFor='password'>Password</label>
                        <input type='password' id='password' name='password' className='text-[black]' />
                        <button type='submit' className='bg-[var(--cerise)] text-white p-2 rounded'>Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

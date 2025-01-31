import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
import { registerUser } from '../api/user';

export default function Register() {
    // localStorage.removeItem('token')
    const [isLoading, setIsLoading] = useState(false);
    async function onClickRegister(e) {
        e.preventDefault()
        if (isLoading) {
            console.log('Please wait Loading...')
        }
        else {
            setIsLoading(true)
            const res = await registerUser(e.target.username.value, e.target.password.value)
            if (res.status === 201) {
                localStorage.setItem('token', res.data.token);
            }
            setIsLoading(false)
            window.location.href = '/dashboard';
        }
    }
    
    const userIsAuthenticated = localStorage.getItem('token') !== null;
    if (userIsAuthenticated) {
        return <Navigate to="/dashboard" />;
    }

    return (
        <div className='Register'>
            <h1 className='text-4xl'>Register</h1>
            <div className='px-[20rem]'>
                <form onSubmit={onClickRegister}>
                    <div className='flex flex-col space-y-4'>
                        <label htmlFor='username'>Username</label>
                        <input type='text' id='username' name='username' className='text-[black]' />
                        <label htmlFor='password'>Password</label>
                        <input type='password' id='password' name='password' className='text-[black]' />
                        <label htmlFor='password'>Repeat Password</label>
                        <input type='password' id='repeated-password' name='repeated-password' className='text-[black]' />
                        <button type='submit' className='bg-[var(--cerise)] text-white p-2 rounded'>Register</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

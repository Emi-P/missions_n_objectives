import React from 'react'
import { Link, useNavigate } from "react-router-dom";

export default function Navigation() {
  const navigate = useNavigate();

  function signOut() {
    localStorage.removeItem('token')
    navigate('/');
  }

  return (
    <div className='Navigation p-4'>
      <Link to='/dashboard'>
        <h1 className='text-4xl'>Missions n' Objectives</h1>
      </Link>

      <div className='flex space-x-6 w-fit'>
        <Link to='/todays-objective-create'>
          <div className='bg-[var(--cerise)] rounded p-1 mt-1 hover:text-2xl transition-all ease-in-out'>
            Create Objective for today
          </div>
        </Link>
        <Link to='/todays-objective-create'>
          <div className='bg-[var(--cerise)] rounded p-1 mt-1 hover:text-2xl transition-all ease-in-out'>
            Create Mission
          </div>
        </Link>
        <div onClick={signOut} className='bg-[var(--cerise)] rounded p-1 mt-1 hover:text-2xl transition-all ease-in-out'>
            Sign out
        </div>
      </div>
    </div>
  )
}

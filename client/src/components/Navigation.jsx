import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import Button from './common/Button';

export default function Navigation() {
  const navigate = useNavigate();

  function signOut() {
    localStorage.removeItem('token')
    navigate('/');
  }
  function apa() {
    alert('test');
  }
  return (
    <div className='Navigation p-4 lg:text-center flex flex-row justify-between items-center'>
      <Link to='/dashboard'>
        <h1 className='md:text-4xl lg:text-4xl p-4 text-2xl'>Missions n' Objectives</h1>
      </Link>

      <div className='flex gap-2 w-fit items-center'>
        <Link to='/todays-objective-create'>
          <Button>
            Create Objective for today
          </Button>
        </Link>
        <Link to='/create-mission'>
          <Button>
            Create Mission
          </Button>
        </Link>
        <Button onClick={signOut}>
          Sign Out
        </Button>
      </div>
    </div>
  )
}

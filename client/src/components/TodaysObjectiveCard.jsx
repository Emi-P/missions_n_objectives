import React from 'react'

export default function TodaysObjectiveCard({objective}) {
  return (
    <div className='TodaysObjectiveCard rounded m-6 p-4'>
        <h3 className='text-2xl'>{objective.title}</h3>
        <p>{objective.description}</p>
    </div>
  )
}

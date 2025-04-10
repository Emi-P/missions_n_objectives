import React from 'react'

export default function TodaysObjectiveCard({ objective, shown }) {
  return (
    <div className='TodaysObjectiveCard flex flex-col rounded m-6 p-4 max-w-96 gap-4'>
      <h3 className='text-2xl text-center'>{objective.title}</h3>
      <div className='text-center bg-[var(--color4)] max-w-lg rounded p-4 overflow-scroll max-h-44'>
        <p>{objective.description}</p>
      </div>
      <div className=' justify-end flex flex-row gap-9'>
        <p>Created on: {objective.creation_date}</p>
        <p>Finishes on: {objective.deadline}</p>
      <input type="checkbox" value={objective.completed} />
      </div>
    </div>
  )
}

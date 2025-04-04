import React from 'react'
import { useState } from 'react';

function CreateMission() {
    const [missionName, setMissionName] = useState('');
    const [missionDescription, setMissionDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevents the default form submission behavior

        console.log('Mission Name:', missionName);
        console.log('Mission Description:', missionDescription);
        // Add logic to handle the form data, e.g., send it to a server
    };
    return (
        <div className='items-center text-center justify-center flex flex-col'>
            <h1 className='text-4xl p-4 w-fit center text-center'>Create Mission</h1>
            <div className='flex flex-col items-center justify-center'>
                <form className='flex flex-col space-y-4 text-black' onSubmit={handleSubmit}>
                    <input type="text"
                        placeholder='Mission Name'
                        value={missionName}
                        onChange={(e) => setMissionName(e.target.value)}
                    />
                    <input type="textare"
                        value={missionDescription}
                        onChange={(e) => setMissionDescription(e.target.value)}/>
                    <button type='submit' className='bg-white' >Create</button>
                </form>
            </div>
        </div>
    )
}

export default CreateMission
import React from 'react'
import { useState } from 'react';
import { postObjective } from '../../api/objectives';
// import ModelCreationForm from '../../components/ModelCreationForm';
import Toaster ,{ toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function CreateObjective() {
    const navigate = useNavigate();

    const [objective, setObjective] = useState({
        title: '',
        description: '',
        creation_date: '',
        deadline: '',
        completed: false,
        completion_date: null,
    });

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents the default form submission behavior

        const NewObjective = {
            title: objective.title,
            description: objective.description,
            creation_date: "2004-01-01",
            deadline: "2028-01-01",
            completed: false,
            completion_date: null,
        }

        await postObjective(NewObjective)
            .then((res) => {
                setObjective({
                    title: '',
                    description: '',
                    creation_date: '',
                    deadline: '',
                    completed: false,
                    completion_date: null,
                });
                toast('Objective created successfully!');
                navigate('/dashboard');
            })
            .catch((error) => {
                console.error('Error creating objective:', error);
                toast('Error creating objective');
            });
    };

    return (
        <div className='items-center text-center justify-center flex flex-col'>
            <h1 className='text-4xl p-4f center text-center'>Create Objective</h1>

            {/* <ModelCreationForm
                modelFields={
                    [
                        { name: 'title', label: 'Title', type: 'text', placeholder: 'Objective Name', value: objective.title },
                        { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Objective Description', value: objective.description },
                        { name: 'creation_date', label: 'Creation Date', type: 'date', placeholder: '', value: objective.creation_date },
                        { name: 'deadobjective.creation_date },line', label: 'Deadline', type: 'date', placeholder: '', value: objective.deadline },
                        ]
                        }
                        setModel={setObjective}
                        />
                        Idea no usada 
                        */}

            <div className='flex flex-col items-center justify-center'>
                <form className='flex flex-col grid-cols-2 space-y-4 text-orange-800' onSubmit={handleSubmit}>
                    <div className=''>
                        <label htmlFor="Title" className=''>Title</label>
                        <input type="text"
                            className='w-full'
                            placeholder='Objective Name'
                            value={objective.title}
                            onChange={(e) => setObjective({ ...objective, title: e.target.value })}
                            required={true}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="Desc">Description</label>
                        <textarea
                            placeholder='Objective Description'
                            value={objective.description}
                            onChange={(e) => setObjective({ ...objective, description: e.target.value })}
                            required={true}
                            rows="5"
                            className=''
                        />
                    </div>
                    <div className=''>
                        <label htmlFor="">Deadline</label>
                        <input type="date" className='w-full' name="" id="" />
                    </div>
                    <button type='submit' className='bg-white'>Create</button>
                </form>
            </div>
        </div >
    )
}

export default CreateObjective
import React from 'react'
import { useState } from 'react';
import { postObjective } from '../../api/objectives';
// import ModelCreationForm from '../../components/ModelCreationForm';
import Toaster, { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';

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
        <div className='text-center justify-center flex flex-col'>
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

            <form className='flex flex-col self-center grid-cols-2 space-y-4 max-w-screen-sm CreateObjectiveForm p-4 mt-10' onSubmit={handleSubmit}>
                <div className='FormField'>
                    <div className='w-fit text-center flex flex-col'>
                        <label htmlFor="">Title</label>
                        <hr />
                    </div>
                    <input type="text"
                        className='w-full'
                        placeholder='-->'
                        value={objective.title}
                        onChange={(e) => setObjective({ ...objective, title: e.target.value })}
                        required={true}
                    />
                </div>
                <div className='flex flex-col FormField'>
                    <div className='w-fit text-center flex flex-col'>
                        <label htmlFor="">Description</label>
                        <hr />
                    </div>
                    <textarea
                        value={objective.description}
                        cols={30}
                        onChange={(e) => setObjective({ ...objective, description: e.target.value })}
                        placeholder='-->'
                        required={true}
                        rows="5"
                        className=''
                    />
                </div>
                <div className='FormField'>
                    <div className='w-fit text-center flex flex-col'>
                        <label htmlFor="">Deadline</label>
                        <hr />
                    </div>
                    <input type="date" className='w-full' name="" id="" />
                </div>
                <Button>Create</Button>
            </form>
        </div >
    )
}

export default CreateObjective
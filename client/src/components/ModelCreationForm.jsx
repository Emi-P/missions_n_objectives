import React from 'react'

function ModelCreationForm({ modelFields = [], setModel }) {
    const handleSubmit = (e) => {
        console.log('Form submitted');
        e.preventDefault();
    }
    return (
            <div className='flex flex-col items-center justify-center'>
                <form className='flex flex-col grid-cols-2 space-y-4' onSubmit={handleSubmit}>
                    {modelFields.map((field, index) => {
                        return (
                            <div key={index} className='flex flex-col'>
                                <label htmlFor={field.name} className=''>{field.label}</label>
                                <input type={field.type}
                                    className='w-full'
                                    placeholder={field.placeholder}
                                    value={field.value}
                                    onChange={(e) => setModel({ ...modelFields, [field.name]: e.target.value })}
                                    required={true}
                                />
                            </div>
                        )
                    })}
                    <div className='flex flex-col'>
                        <button type='submit' className=' p-2 rounded-md'>Create</button>
                    </div>
                </form>
            </div>
    )
}

export default ModelCreationForm
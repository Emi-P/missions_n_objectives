import React from 'react'
import { useEffect, useState } from "react"
import { getAllObjectives } from "../api/objectives";
import TodaysObjectiveCard from './TodaysObjectiveCard';

export default function TodaysObjectiveDashboard() {
    const [todaysObjectives, setTodaysObjectives] = useState([])

    useEffect(() => {
        async function loadTodaysObjectives() {
            const res = await getAllObjectives()
            setTodaysObjectives(res.data)
        }
        loadTodaysObjectives()
    }, []);

    const [nameFilter, setNameFilter] = useState("");

    const handleFilterChange = (event) => {
        setNameFilter(event.target.value);
    }

    return (
        <div>
            <div>
                <input
                    type="text"
                    className='text-black FilterItem translate-x-12 relative'
                    placeholder="Filter by name"
                    value={nameFilter}
                    onChange={handleFilterChange}
                />
            </div>

            <div className='flex flex-col items-center'>
                {todaysObjectives.map((objective) => {
                    console.log(objective)
                    if (nameFilter && !objective.title.toLowerCase().includes(nameFilter.toLowerCase())) {
                        return null;
                    }
                    return (
                        <div key={objective.id}>
                            <TodaysObjectiveCard objective={objective} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
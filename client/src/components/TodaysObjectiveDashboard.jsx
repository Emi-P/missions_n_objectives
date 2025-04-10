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

    const filterCriteria = (objective) => {
        // Add filter condition here
        return objective.title.toLowerCase().includes(nameFilter.toLowerCase());
    }

    return (
        <div className="flex flex-col items-center">
            <div>
                <input
                    type="text"
                    className='text-black FilterItem relative'
                    placeholder="Filter by name"
                    value={nameFilter}
                    onChange={handleFilterChange}
                />
            </div>

            <div className='flex flex-col items-center ObjectiveListContainer w-fit mt-4'>
                {nameFilter && todaysObjectives.some(objective => objective.title.toLowerCase().includes(nameFilter.toLowerCase())) ? (
                    <p></p>
                ) : (
                    nameFilter && <p className='hiddenAnimation shownAnimation'>No objectives match the filter.</p>
                )
                }
                {todaysObjectives.map((objective) => {
                    if (!filterCriteria(objective)) {
                        return (
                            <div key={objective.id} className='hiddenAnimation'>
                                <TodaysObjectiveCard objective={objective} />
                            </div>
                        )
                    }
                    else
                        return (
                            <div key={objective.id} className='shownAnimation'>
                                <TodaysObjectiveCard objective={objective} />
                            </div>
                        )
                })}
            </div>
        </div>
    )
}
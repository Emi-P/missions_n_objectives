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

    return (
        <div>
            {todaysObjectives.map((objective) => {
                return (

                <li key={objective.id}>
                    <TodaysObjectiveCard objective={objective} />
                </li>)
            })}
        </div>
    )
}

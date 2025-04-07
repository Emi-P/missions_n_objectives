import axios from 'axios'

const taskApi = axios.create({
    baseURL: 'http://localhost:8000/missionsnobjectives/api/v1/objectives'
})

export const getAllObjectives = () => {
    return taskApi.get('/', {
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
        }
    });
}

export const postObjective = (objective) => {
    return taskApi.post('/', objective, {
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
        }
    });
}
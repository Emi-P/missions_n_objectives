import axios from 'axios'

const taskApi = axios.create({
    baseURL: 'http://localhost:8000/missionsnobjectives/api/v1/objectives'
})

export const getAllObjectives = () => {
    return taskApi.get('/');
}
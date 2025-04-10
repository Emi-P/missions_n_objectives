import axios from 'axios'

const taskApi = axios.create({
    baseURL: 'http://localhost:8000/missionsnobjectives/'
})

export const registerUser = (username, password) => {
    return taskApi.post('register/', {
        'username': username,
        'password': password
    });
}

export const loginUser = (username, password) => {
    return taskApi.post('login/', {
        'username': username,
        'password': password
    });
}
import axios from 'axios';

const baseURL = process.env.VUE_APP_BASE_URL;

export function findAllTeachersApi() {
    return axios.get(`${baseURL}/teacher`)
}

export function findOneTeacherApi(id) {
    return axios.get(`${baseURL}/teacher/${id}`)
}

export function createTeacherApi(data) {
    return axios.post(`${baseURL}/teacher/create`, data)
}

export function updateTeacherApi(id, data) {
    return axios.patch(`${baseURL}/teacher/${id}`, {
        "name": data.name,
        "lastName": data.lastname,
        "email": data.email,
    })
}

export function deleteTeacherApi(id) {
    return axios.delete(`${baseURL}/teacher/${id}`)
}

import axios from 'axios';

const baseURL = process.env.VUE_APP_BASE_URL;

export function finAllTeachersApi() {
    return axios.get(`${baseURL}/teacher`)
}

export function finOneTeacherApi(id) {
    return axios.get(`${baseURL}/teacher/${id}`)
}

export function createTeacherApi(data) {
    return axios.post(`${baseURL}/teacher/create`, {
        "name": data.name,
        "lastName": data.lastname,
        "codigo": data.codigo,
        "email": data.email,
    })
}

export function updateTeacherApi(id, data) {
    return axios.patch(`${baseURL}/teacher/${id}`, {
        "name": data.name,
        "lastName": data.lastname,
        "email": data.email,
    })
}

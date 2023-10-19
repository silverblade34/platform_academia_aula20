import axios from 'axios';

const baseURL = process.env.VUE_APP_BASE_URL;


export function createUserApi(data) {
    return axios.post(`${baseURL}/user/create`, {
        "username": data.username,
        "password": data.password,
        "codigo": data.codigo,
        "rol": data.rol,
    })
}

export function updateUserApi(id, data) {
    return axios.patch(`${baseURL}/user/${id}`, {
        "username": data.username,
        "password": data.password
    })
}

export function checkUsernameAvailabilityApi(username) {
    return axios.get(`${baseURL}/user/usernameAvailability/${username}`)
}

export function deleteUserApi(id) {
    return axios.delete(`${baseURL}/user/${id}`)
}
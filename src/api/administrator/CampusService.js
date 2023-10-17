import axios from 'axios';

const baseURL = process.env.VUE_APP_BASE_URL;

export function finAllCampusApi() {
    return axios.get(`${baseURL}/campus`)
}

export function finOneCampusApi(id) {
    return axios.get(`${baseURL}/campus/${id}`)
}

export function createCampusApi(data) {
    return axios.post(`${baseURL}/campus/create`, data)
}

export function updateCampusApi(id, data) {
    return axios.patch(`${baseURL}/campus/${id}`, data)
}

export function deleteCampusApi(id) {
    return axios.delete(`${baseURL}/campus/${id}`)
}
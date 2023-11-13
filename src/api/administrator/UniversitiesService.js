import axios from 'axios';

const baseURL = process.env.VUE_APP_BASE_URL;

export function finAllUniversitiesApi() {
    return axios.get(`${baseURL}/university`)
}

export function finOneUniversitiesApi(id) {
    return axios.get(`${baseURL}/university/${id}`)
}

export function createUniversitiesApi(data) {
    console.log("------DATA CREATE UNIVERSITY---------")
    console.log(data)
    return axios.post(`${baseURL}/university/create`, data)
}

export function updateUniversitiesApi(id, data) {
    return axios.patch(`${baseURL}/university/${id}`, data)
}


export function deleteUniversitiesApi(id) {
    return axios.delete(`${baseURL}/university/${id}`)
}
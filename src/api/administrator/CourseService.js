import axios from 'axios';

const baseURL = process.env.VUE_APP_BASE_URL;

export function findAllCourseApi() {
    return axios.get(`${baseURL}/course`)
}

export function findOneCourseApi(id) {
    return axios.get(`${baseURL}/course/${id}`)
}

export function createCourseApi(data) {
    return axios.post(`${baseURL}/course/create`, data)
}

export function updateCourseApi(id, data) {
    return axios.patch(`${baseURL}/course/${id}`, data)
}

export function deleteCourseApi(id) {
    return axios.delete(`${baseURL}/course/${id}`)
}
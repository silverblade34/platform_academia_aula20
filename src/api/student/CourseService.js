import axios from 'axios';

const baseURL = process.env.VUE_APP_BASE_URL;

export function findAllCourseStudentApi(codigo) {
    return axios.get(`${baseURL}/course/student/${codigo}`)
}

export function findAllCourseEvaluationApi(courseId, studendCode) {
    return axios.get(`${baseURL}/course-evaluation/${courseId}/${studendCode}`)
}

export function generateCourseEvaluationApi(data) {
    return axios.post(`${baseURL}/course-evaluation/generate`, data)
}

export function createCourseEvaluationApi(data) {
    return axios.post(`${baseURL}/course-evaluation`, data)
}
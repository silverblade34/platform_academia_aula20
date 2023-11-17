import axios from 'axios';

const baseURL = process.env.VUE_APP_BASE_URL;

export function courseTeacherApi(codigo) {
    return axios.get(`${baseURL}/course/teacher/${codigo}`)
}

export function findSyllabusCourseApi(id) {
    return axios.get(`${baseURL}/course/syllabus/${id}`)
}
import axios from 'axios';

const baseURL = process.env.VUE_APP_BASE_URL;

export function dashboardCourseEvaluationsApi(codigo) {
    return axios.get(`${baseURL}/course-evaluation/dashboard?codestudent=${codigo}`)
}

export function findAllCourseEvaluationsApi(codigo) {
    return axios.get(`${baseURL}/course-evaluation/student?codestudent=${codigo}`)
}
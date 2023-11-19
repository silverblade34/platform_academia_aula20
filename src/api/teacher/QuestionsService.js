import axios from 'axios';

const baseURL = process.env.VUE_APP_BASE_URL;

export function findAllQuestionSyllabusApi(id) {
    return axios.get(`${baseURL}/questions/syllabus/${id}`)
}

export function createQuestionApi(data) {
    return axios.post(`${baseURL}/questions`, data);
}

export function findAllPossibleAnswersQuestionApi(id) {
    return axios.get(`${baseURL}/possible-answers/question/${id}`);
}
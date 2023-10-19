import axios from 'axios';

const baseURL = process.env.VUE_APP_BASE_URL;

export function finAllStudentApi() {
    return axios.get(`${baseURL}/student`)
}

export function finOneTeacherApi(id) {
    return axios.get(`${baseURL}/teacher/${id}`)
}

export function createStudentApi(data) {
    return axios.post(`${baseURL}/student/create`, {
        "name": data.name,
        "lastName": data.lastname,
        "codigo": data.codigo,
        "email": data.email,
        "id_campus": data.id_campus,
        "genero": data.genero,
        "id_university": data.id_university,
    })
}

export function updateTeacherApi(id, data) {
    return axios.patch(`${baseURL}/teacher/${id}`, {
        "name": data.name,
        "lastName": data.lastname,
        "email": data.email,
    })
}

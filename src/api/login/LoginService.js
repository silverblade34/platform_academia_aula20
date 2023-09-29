import axios from 'axios';

const baseURL = process.env.VUE_APP_BASE_URL;

export function loginApi(username, password) {
    return axios.post(`${baseURL}/login/auth`,
        {
            username,
            password
        })
}
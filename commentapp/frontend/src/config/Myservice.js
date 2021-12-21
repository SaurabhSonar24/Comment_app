import axios from 'axios';
import { MAIN_URL } from './Url';


let token = localStorage.getItem('_token');

export function registerUser(data) {
    return axios.post(`${MAIN_URL}socket/register`, data);
}


export function loginUser(data) {
    return axios.post(`${MAIN_URL}socket/login`, data);
}

export function getDetails(data) {
    return axios.post(`${MAIN_URL}socket/addPost`, data);
}
export function getProducts() {
    return axios.get(`${MAIN_URL}socket/products`, {
        headers: { "Authorization": `Bearer ${token}` }
    });


}


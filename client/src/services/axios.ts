import axios from 'axios';
import Cookies from 'js-cookie'

export const api = axios.create({
  baseURL: 'http://localhost:4000',
});

api.defaults.withCredentials = true;
api.defaults.headers['Content-Type'] = 'application/json';
api.defaults.headers['Authorization'] = 'Bearer ' + Cookies.get('token');


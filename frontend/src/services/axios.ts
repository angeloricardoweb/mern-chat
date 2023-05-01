import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://localhost:4000',
});

api.defaults.withCredentials = true;

import axios from 'axios';

const api = axios.create({
  baseURL: 'https://gymbro-apy.onrender.com/api/v1',
});

export default api;
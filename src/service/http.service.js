import axios from 'axios';

const PORT = '3306';

export const httpAdmin = axios.create({
    baseURL: `http://localhost:${PORT}/api/admin`
});














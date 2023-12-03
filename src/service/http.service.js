import axios from 'axios';

const PORT = '3306';

// локальная разработка
export const httpAdmin = axios.create({
    baseURL: `http://localhost:${PORT}/api/admin`
});

export const httpSQL = axios.create({
    baseURL: `http://localhost:${PORT}/api/sql`
});

// хостинг
// export const httpAdmin = axios.create({
//     baseURL: 'http://booking-flights.kebikov.com/api/admin'
// });

// export const httpSQL = axios.create({
//     baseURL: 'http://booking-flights.kebikov.com/api/sql'
// });
















import axios from 'axios';

// TODO: Don't store JWT in local storage (vulnerable to attack));

// axios.interceptors.request.use(
//   (config) => {
//     const jwt = localStorage.getItem('jwt');
//     if (jwt) {
//       config.headers['Authorization'] = `Bearer ${jwt}`;
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );

export default axios;

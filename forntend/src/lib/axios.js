import axios from 'axios'


const axiosInstance = axios.create({
    baseURL: process.env.VITE_BACKEND_URL, 
    withCredentials:true // browser will send the cookies to servre 
    // automatically on evry single req
});

export default axiosInstance;
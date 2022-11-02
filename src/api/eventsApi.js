import axios from "axios";


const eventsApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

//Configurar interceptores
eventsApi.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }

    return config;
});

export default eventsApi;
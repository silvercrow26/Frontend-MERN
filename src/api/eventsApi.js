import axios from "axios";
import { getEnvVariables } from "../helpers";

const { VITE_API_URL } = getEnvVariables();

const eventsApi = axios.create({
    baseURL: VITE_API_URL
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
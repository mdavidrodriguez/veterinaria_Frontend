import axios from "axios";

const clienteAxios = axios.create({
    baseURL: `https://veterinaria-backend.onrender.com/api`
})


export default clienteAxios
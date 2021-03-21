import axios from 'axios';

const base_url = axios.create({baseURL:'http://localhost:8081/api/v1/heroes'});

export default base_url;
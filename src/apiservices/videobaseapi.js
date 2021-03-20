import axios from 'axios';

const base_url = axios.create({baseURL:'https://youtube.googleapis.com/youtube/v3/videos'});

export default base_url;
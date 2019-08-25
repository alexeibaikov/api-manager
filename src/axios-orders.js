import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-6acf7.firebaseio.com/'
});

export default instance;
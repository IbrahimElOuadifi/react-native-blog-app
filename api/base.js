import axios from 'axios';

const baseURL = 'https://mern-blog-2456.herokuapp.com/';

export default axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' }
});
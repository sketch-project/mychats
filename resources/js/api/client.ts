import axios from 'axios';

const Axios = axios.create({
    timeout: 3000,
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    }
});
export default Axios;

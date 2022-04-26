import axios from 'axios';

export const roleAPI = axios.create({
  baseURL: `${process.env.REACT_APP_ROLE_URL}`,
});

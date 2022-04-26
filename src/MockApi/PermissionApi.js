import axios from 'axios';

export const permissionAPI = axios.create({
  baseURL: `${process.env.REACT_APP_PERMISSION_URL}`,
});

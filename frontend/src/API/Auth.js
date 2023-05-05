import { setAuthToken } from "../helpers";
import axios from 'axios'

export const SERVER_URL='http://localhost:8080'

export function hasJWT() {
  let flag = false;
  localStorage.getItem("token") ? flag=true:flag=false;
  return flag
}

export const handleSubmit = (login, pass) => {
  const loginPayload = {
    username: login,
    password: pass
  }
  axios.post(`${SERVER_URL}/auth/token/login`, loginPayload)
       .then(response => {
         const token = response.data.token;

         localStorage.setItem("token", token);
         setAuthToken(token);
       }).catch(err => console.log(err));
}

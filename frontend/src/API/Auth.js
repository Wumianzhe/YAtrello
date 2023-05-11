import axios from 'axios'
import ProfileService from './ProfileService';
import { selectToken } from './authSlice';
import store from '../store';

export const axInstance = axios.create({
  baseURL: 'http://localhost:8080'
})

const PS = new ProfileService()

const handleError = (error) => {
  if (error.response) {
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `erroror.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message);
  }
}

export function hasAuth() {
  let flag = false;
  const authState = store.getState().auth
  // if its undefined, there was no login yet
  authState.auth ? flag = true : flag = false;
  if (flag && axInstance.defaults.headers.common["Authorization"] === undefined) {
    const token = selectToken(authState);
    axInstance.defaults.headers.common["Authorization"] = `Token ${token}`
  }
  return flag
}

export const handleLogin = async (payload) => {
  let token
  await axInstance.post(`/auth/token/login`, payload)
    .then(response => {
      token = response.data.auth_token;

      setAuthToken(token);
    }).catch(err => handleError(err));
  const uid = await getUidByToken();
  const groups = await PS.getGroups(uid);
  const auth = {
    token: token,
    uid: uid,
    isStaff: groups.some(item => item.id === 1)
  }
  return auth;
}

export function logout() {
  axInstance.post(`/auth/token/logout`, {})
            .then().catch(err => handleError(err));
}

export const setAuthToken = token => {
  if (token) {
    axInstance.defaults.headers.common["Authorization"] = `Token ${token}`
  } else {
    delete axInstance.defaults.headers.common["Authorization"]
  }
}

async function getUidByToken() {
  let uid;
  await axInstance.get(`auth/uid_by_token`, {})
    .then(response => {
      uid = response.data.user_id
    }).catch(err => handleError(err));
  return uid;
}

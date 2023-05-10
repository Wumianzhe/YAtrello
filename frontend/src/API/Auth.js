import axios from 'axios'
import ProfileService from './ProfileService';


export const axInstance = axios.create({
  baseURL: 'http://localhost:8080'
})

const PS = new ProfileService()

export function hasAuth() {
  let flag = false;
  localStorage.getItem("auth") ? flag = true : flag = false;
  if (flag && axInstance.defaults.headers.common["Authorization"] === undefined) {
    const auth = JSON.parse(localStorage.getItem("auth"))
    axInstance.defaults.headers.common["Authorization"] = `Token ${auth.token}`
  }
  return flag
}

export const handleLogin = async (login, pass) => {
  const loginPayload = {
    username: login,
    password: pass
  }
  let token
  await axInstance.post(`/auth/token/login`, loginPayload)
    .then(response => {
      token = response.data.auth_token;

      setAuthToken(token);
    }).catch(err => console.log(err));
  const uid = await getUidByToken();
  const groups = await PS.getGroups(uid);
  localStorage.setItem("auth", JSON.stringify({
    token: token,
    uid: uid,
    isStaff: groups.some(item => item.id === 1)
  }))
}

export const handleRegister = async (formData) => {
  const registerPayload = {
    username: formData.get("login"),
    password: formData.get("pass"),
    email: formData.get("email")
  }
  await axInstance.post(`/auth/users/`, registerPayload)
    .then().catch(err => console.log(err))
  await handleLogin(registerPayload.username, registerPayload.password);
}

export function logout() {
  axInstance.post(`/auth/token/logout`, {})
    .then().catch(err => console.log(err));
  setAuthToken(null);
  localStorage.removeItem("auth");
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
    }).catch(err => console.log(err));
  return uid;
}

import axios from 'axios'

export const axInstance = axios.create({
  baseURL : 'http://localhost:8080'
})

export function hasJWT() {
  let flag = false;
  localStorage.getItem("token") ? flag=true:flag=false;
  if (flag && axInstance.defaults.headers.common["Authorization"] === undefined) {
    axInstance.defaults.headers.common["Authorization"] = `Token ${localStorage.getItem("token")}`
  }
  return flag
}

export const handleLogin = async (login, pass) => {
  const loginPayload = {
    username: login,
    password: pass
  }
  await axInstance.post(`/auth/token/login`, loginPayload)
       .then(response => {
         const token = response.data.auth_token;

         localStorage.setItem("token", token);
         setAuthToken(token);
       }).catch(err => console.log(err));
}

export const handleRegister = async(formData) => {
  const registerPayload = {
    username: formData.get("login"),
    password: formData.get("pass"),
    email: formData.get("email")
  }
  await axInstance.post(`/auth/users/`, registerPayload)
                  .then().catch(err => console.log(err))
  await handleLogin(registerPayload.username,registerPayload.password);
}

export function logout() {
  axInstance.post(`/auth/token/logout`, {})
       .then().catch(err => console.log(err));
  setAuthToken(null);
  localStorage.removeItem("token");
}

export async function getUserData(uid) {
  let data
  await axInstance.get(`/auth/users/${uid}/`,{})
       .then(response => {
         data = response.data
       }).catch(err => console.log(err));
  console.log("user data getter fired");
  return data
}

export const setAuthToken = token => {
  if (token) {
    axInstance.defaults.headers.common["Authorization"] = `Token ${token}`
  } else {
    delete axInstance.defaults.headers.common["Authorization"]
  }
}

export async function getUidByToken() {
  let uid;
  await axInstance.get(`auth/uid_by_token`, {})
            .then(response => {
              uid = response.data.user_id
            }).catch(err => console.log(err));
  return uid;
}

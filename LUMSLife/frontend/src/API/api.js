import axios from "axios";

// export let url = `http://localhost:3000/api`;
// export const url = process.env.REACT_APP_API_BASE_URL;
// export let url = "/api"

export let url = 'https://guarded-river-13886.herokuapp.com/api'
console.log(url)

//the data returned by a function can be accessed by using .data on the object

// create a new account of account_type with the specified email and password
// returns a json object containing "is_succesful" and "account_ID" / "error_message"
export async function signup(email, password, accountType) {
  const request = {
    email: email,
    password: password,
    accountType: accountType,
  };

  return await axios.post(`${url}/general/signup`, request);
}

// login to an existing account with the specified email and password
// return a json object containing "is_succesful" and "account_ID" / "error_message"
export async function login(email, password) {
  const request = {
    email: email,
    password: password,
  };
  console.log(url)
  return await axios.post(`${url}/general/login`, request);
}

export async function validateEmail(email) {
  const request = {
    email: email,
  };

  return await axios.post(`${url}/general/validateEmail`, request);
}

export async function createPost(formData) {
  return await axios.post(`${url}/general/create-post`, formData);
}

export async function emailVerification(email, otp) {
  const request = {
    email: email,
    otp: otp,
  };
  return await axios.post(`${url}/general/verify-email`, request);
}

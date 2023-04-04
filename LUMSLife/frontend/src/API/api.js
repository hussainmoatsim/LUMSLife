import axios from "axios";

let url = `http://localhost:3000/api`;

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

  return await axios.post(`${url}/general/login`, request);
}

export async function validateEmail(email) {
  const request = {
    email: email,
  };

  return await axios.post(`${url}/general/validateEmail`, request);
}

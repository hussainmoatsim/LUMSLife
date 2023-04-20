import axios from "axios";

export let url = `http://localhost:3000/api`;

//the data returned by a function can be accessed by using .data on the object

// create a new account of account_type with the specified email and password
// returns a json object containing is_succesful and "account_ID" / error_message
export async function signup(email, password, accountType) {
  const request = {
    email: email,
    password: password,
    accountType: accountType,
  };

  return await axios.post(`${url}/general/signup`, request);
}

// login to an existing account with the specified email and password
// return a json object containing is_succesful and "account_ID" / error_message
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

//Remove a student account associated with a specific student id
// return a json object containing is_succesful / error_message
export async function removeStudentAccount(Student_id) {
    
  const request = {
    Student_id: Student_id
  }
  

  return await axios.post(`${url}/general/removeStudentAccount`, request)
}

// search for relevant societies, events and posts using search_string
// returns a json object containing three lists: "societyList", "postsList" and "eventsList"
export async function search(searchString) {

    const request = {
        "searchString": searchString
    }

    return await axios.post(`${url}/general/search`, request)
}

//Remove a society account associated with a specific society id
// return a json object containing is_succesful / error_message
export async function removeSocietyAccount(Society_id) {
    
  const request = {
    Society_id: Society_id
  }

  return await axios.post(`${url}/general/removeSocietyAccount`, request)
}
export async function getAccountInfo(User_id) {

    const request = {
        User_id: User_id
    }

    return await axios.post(`${url}/general/getAccountInfo`, request)
}

export async function deleteUserAccount(User_id) {
    
    const request = {
        User_id: User_id
    }

    return await axios.post(`${url}/general/deleteUserAccount`, request)
}
export async function updateUser(User_id, newEmail, newPassword) {

    const request = {
        User_id: User_id,
        newEmail: newEmail,
        newPassword : newPassword
    }

    return await axios.post(`${url}/general/updateUser`, request)
}

export async function updateStudent(Student_id, student_name, cv, about_me) {

    const request = {
        Student_id: Student_id,
        student_name: student_name,
        cv: cv,
        about_me: about_me
    }

    return await axios.post(`${url}/student/updateStudent`, request)
}
export async function updateSociety(Society_id, society_name) {

    const request = {
        Society_id: Society_id,
        society_name: society_name
    }

    return await axios.post(`${url}/society/updateSociety`, request)
}
export async function getStudentInfo(User_id) {

    const request = {
        User_id: User_id
    }

    return await axios.post(`${url}/student/getStudentInfo`, request)
}

export async function getSocietyInfo(User_id) {

    const request = {
        User_id: User_id
    }

    return await axios.post(`${url}/society/getSocietyInfo`, request)
}

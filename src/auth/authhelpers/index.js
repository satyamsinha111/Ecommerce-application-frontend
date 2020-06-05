import { API } from "../../backend";

export const Signup = (user) => {
  console.log(user);
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .catch((error) => {
      console.log("SIGNUP SERVER ERROR", error);
    });
};

export const Signin = (user) => {
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log("SIGNIN SERVER ERROR", error);
    });
};

export const Authenticate = (data, next) => {
  if (typeof window !== undefined) {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const Signout = (next) => {
  if (typeof window !== undefined) {
    localStorage.removeItem("jwt");
    next();
    return fetch(`${API}/signout`, {
      method: "GET",
    })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }
};

export const isAuthenticated = () => {
  if (typeof window === undefined) {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};

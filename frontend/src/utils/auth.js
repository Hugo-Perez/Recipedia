const API_URL = "http://localhost:8080/api/auth/";

const register = (registerForm) => {
  return fetch(API_URL + "signup/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(registerForm),
    redirect: "follow",
  });
};

const login = (loginForm) => {
  return fetch(API_URL + "signin/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginForm),
    redirect: "follow",
  });
};

const logout = () => {
  localStorage.removeItem("user");
  window.location.reload();
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authHeader = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.accessToken) {
    return `Bearer ${user.accessToken}`;
  } else {
    return "";
  }
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
  authHeader,
};

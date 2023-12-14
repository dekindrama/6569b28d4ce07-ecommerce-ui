import axios from "axios";

const api = (() => {
  //* config
  const BASE_URL = "http://localhost:8000/api";
  function configs() {
    return {
      headers: { Authorization: `Bearer ${getAccessToken()}` },
    };
  }

  //* api lists
  async function login({ email, password }: any) {
    const response = await axios.post(BASE_URL + "/login", {
      email,
      password,
      device_name: "website",
    });

    const { status, message, data } = response.data;

    if (status == false) {
      throw new Error(message);
    }

    return data.access_token;
  }

  function putAccessToken(token: string) {
    localStorage.setItem("accessToken", token);
  }

  function getAccessToken() {
    return localStorage.getItem("accessToken");
  }

  async function getOwnProfile() {
    const response = await axios.get(BASE_URL + "/logged-user", configs());

    const { status, message, data } = response.data;

    if (status == false) {
      throw new Error(message);
    }

    return data.logged_user;
  }

  async function logout() {
    const response = await axios.post(BASE_URL + "/logout", {}, configs());

    const { status, message } = response.data;

    if (status == false) {
      throw new Error(message);
    }

    return message;
  }

  return {
    login,
    putAccessToken,
    getAccessToken,
    getOwnProfile,
    logout,
  };
})();

export default api;

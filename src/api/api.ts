import axios from "axios";
import itemApi from "./itemApi";
import { config } from "process";

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
    try {
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
    } catch (error: any) {
      const { status, message } = error.response.data;
      if (status == false) {
        throw new Error(message);
      }

      throw error;
    }
  }

  function putAccessToken(token: string) {
    localStorage.setItem("accessToken", token);
  }

  function getAccessToken() {
    return localStorage.getItem("accessToken");
  }

  async function getOwnProfile() {
    try {
      const response = await axios.get(BASE_URL + "/logged-user", configs());

      const { status, message, data } = response.data;

      if (status == false) {
        throw new Error(message);
      }

      return data.logged_user;
    } catch (error: any) {
      const { status, message } = error.response.data;
      if (status == false) {
        throw new Error(message);
      }

      throw error;
    }
  }

  async function logout() {
    try {
      const response = await axios.post(BASE_URL + "/logout", {}, configs());

      const { status, message } = response.data;

      if (status == false) {
        throw new Error(message);
      }

      return message;
    } catch (error: any) {
      const { status, message } = error.response.data;
      if (status == false) {
        throw new Error(message);
      }

      throw error;
    }
  }

  async function register(params: {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
    role: string;
  }) {
    try {
      const response = await axios.post(
        BASE_URL + "/register",
        {
          ...params,
          password_confirmation: params.passwordConfirmation,
        },
        configs(),
      );

      const { message } = response.data;

      return message;
    } catch (error: any) {
      const { status, message } = error.response.data;
      if (status == false) {
        throw new Error(message);
      }

      throw error;
    }
  }

  async function getListUsers() {
    try {
      const response = await axios.get(BASE_URL + "/users", configs());

      const { status, message, data } = response.data;

      if (status == false) {
        throw new Error(message);
      }

      return data.users;
    } catch (error: any) {
      const { status, message } = error.response.data;
      if (status == false) {
        throw new Error(message);
      }

      throw error;
    }
  }

  const itemApiFunctions = itemApi(BASE_URL, configs);

  return {
    login,
    putAccessToken,
    getAccessToken,
    getOwnProfile,
    logout,
    register,
    getListUsers,

    ...itemApiFunctions,
  };
})();

export default api;

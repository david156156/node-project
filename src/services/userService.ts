import axios from "axios";
import { Token, User } from "../interfaces/User";
import { jwtDecode } from "jwt-decode";

const api: string = `${process.env.REACT_APP_API}/users`;

export interface LoginCredentials {
  email: string;
  password: string;
}

export function decode(token: string) {
  const decoded = jwtDecode<Token>(token);
  return decoded;
}
// 1111@gmail.com
// Aa@22222

// 22222@gmail.com
// Aa@111111
export async function login(credentials: LoginCredentials) {
  try {
    const response = await axios.post(`${api}/login`, credentials);
    localStorage.setItem("token", response.data);
    const decoded = jwtDecode<Token>(response.data);
    return response.data;
  } catch (error) {
    alert("Login failed");
    throw error;
  }
}

export function logout() {
  localStorage.removeItem("token");
}

export function addUser(userData: User) {
  return axios.post(api, userData);
}

export async function addUser1(userData: User): Promise<void> {
  try {
    await axios.post(api, userData);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage = error.response.data.message;
      if (errorMessage.includes("email")) {
        alert("Email already exists");
      } else if (errorMessage.includes("password")) {
        alert("Invalid password");
      } else {
        alert("An error occurred: " + errorMessage);
      }
    } else {
      alert("An unknown error occurred");
    }
    throw error;
  }
}

export function getToken(): string | null {
  return localStorage.getItem("token");
}

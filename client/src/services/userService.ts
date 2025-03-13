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

export function getToken(): string | null {
  return localStorage.getItem("token");
}

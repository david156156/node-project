import axios from "axios";
import { User } from "../interfaces/User";

const api: string = `${process.env.REACT_APP_API}/users`;

// export async function login(credentials: LoginCredentials) {
//     try {
//       const response = await axios.post<UserResponse>(`${api}/login`, credentials);

//       // Store token in localStorage
//       localStorage.setItem('token', response.data.token);

//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   }

export function addUser(userData: User) {
  return axios.post(api, userData);
}

export function logout() {
  localStorage.removeItem("token");
}

export function getToken(): string | null {
  return localStorage.getItem("token");
}

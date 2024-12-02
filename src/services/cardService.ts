import axios from "axios";

const api: string = `${process.env.REACT_APP_API}/cards`;

export function getAllCards() {
  return axios.get(api);
}

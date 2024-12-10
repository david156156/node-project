import axios from "axios";
import { Card } from "../interfaces/Card";

const api: string = `${process.env.REACT_APP_API}/cards`;

export function getAllCards() {
  return axios.get(api);
}
export function addCard(newCard: Card) {
  // Get token from localStorage
  const token = localStorage.getItem("token");

  // Add token to request headers
  return axios.post(api, newCard, {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  });
}

export function deleteCard(id: string) {
  return axios.delete(`${api}/${id}`);
}
export function updateCard(id: string, updatedCard: Card) {
  return axios.put(`${api}/${id}`, updatedCard);
}

export async function updateCardLikes(cardId: string) {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }

  const response = await axios.patch(
    `${api}/${cardId}`,
    {},
    {
      headers: {
        "x-auth-token": token,
      },
    }
  );

  return response.data;
}

export async function getMyCards() {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }

  const response = await axios.get(`${api}/my-cards`, {
    headers: {
      "x-auth-token": token,
    },
  });

  return response.data;
}

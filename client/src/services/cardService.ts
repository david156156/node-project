import axios from "axios";
import { Card } from "../interfaces/Card";

const api: string = `${process.env.REACT_APP_API}/cards`;

export function getAllCards() {
  return axios.get(api);
}

export function addCard(newCard: Card) {
  const token = localStorage.getItem("token");
  return axios.post(api, newCard, {
    headers: {
      Authorization: token,
    },
  });
}

export function deleteCard(id: string) {
  const token = localStorage.getItem("token");

  return axios.delete(`${api}/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
}
export function updateCard(id: string, updatedCard: Card) {
  const token = localStorage.getItem("token");

  return axios.put(`${api}/${id}`, updatedCard, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
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
        Authorization: token,
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
      Authorization: token,
    },
  });

  return response.data;
}

export async function getCardById(id: string) {
  const response = await axios.get(`${api}/${id}`);
  return response.data;
}

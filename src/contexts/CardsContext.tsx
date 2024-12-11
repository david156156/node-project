// src/contexts/CardsContext.tsx
import { createContext, useState, useContext, ReactNode } from "react";
import { Card } from "../interfaces/Card";
import { getAllCards, updateCardLikes } from "../services/cardService";
import { useUser } from "./UserContext";

interface CardsContextType {
  cards: Card[];
  setCards: (cards: Card[]) => void;
  favoriteCards: Card[];
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string | null;
  fetchCards: () => Promise<void>;
  handleLike: (cardId: string) => Promise<void>;
}

const CardsContext = createContext<CardsContextType | null>(null);

export const CardsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();

  const fetchCards = async () => {
    try {
      setLoading(true);
      const response = await getAllCards();
      setCards(response.data);
    } catch (err) {
      setError("Failed to fetch cards");
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (cardId: string) => {
    try {
      setLoading(true);
      await updateCardLikes(cardId);
      setCards((prevCards) =>
        prevCards.map((card) => {
          if (card._id === cardId && user?._id) {
            const newLikes = card.likes || [];
            const userLiked = newLikes.includes(user._id);

            return {
              ...card,
              likes: userLiked
                ? newLikes.filter((id) => id !== user._id)
                : [...newLikes, user._id],
            };
          }
          return card;
        })
      );
    } catch (error) {
      console.error("Failed to update like:", error);
    } finally {
      setLoading(false);
    }
  };

  const favoriteCards = cards.filter((card) =>
    card.likes?.includes(user?._id || "")
  );

  return (
    <CardsContext.Provider
      value={{
        cards,
        setCards,
        favoriteCards,
        loading,
        setLoading,
        error,
        fetchCards,
        handleLike,
      }}
    >
      {children}
    </CardsContext.Provider>
  );
};

export const useCards = () => {
  const context = useContext(CardsContext);
  if (!context) {
    throw new Error("useCards must be used within CardsProvider");
  }
  return context;
};

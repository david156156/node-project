import { FunctionComponent, useContext, useEffect, useState } from "react";
import { getAllCards } from "../services/cardService";
import { Card as CardInterface } from "../interfaces/Card";
import { ThemeContext } from "../contexts/ThemeContext";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { useCards } from "../contexts/CardsContext";

interface CardProps {}

const Card: FunctionComponent<CardProps> = () => {
  const navigat = useNavigate();
  const [filteredCards, setFilteredCards] = useState<CardInterface[]>([]);
  const { searchTerm, darkMode } = useContext(ThemeContext);
  const { user } = useUser();
  const { handleLike, cards, setCards } = useCards();

  useEffect(() => {
    getAllCards()
      .then((res) => {
        setCards(res.data);
        setFilteredCards(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const filtered = cards.filter((card) =>
      card.title.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
    setFilteredCards(filtered);
  }, [searchTerm, cards]);

  const handleAddCard = () => {
    navigat("/add-card");
  };

  const handleCardClick = (id: string) => {
    navigat(`/card/${id}`);
  };
  return (
    <>
      <div className="container mt-5">
        <h4 className="text-center display-5">Cards Page</h4>
        <p className="text-center h4 mb-4">
          here you can find business cards from all categories
        </p>
        <div className="container d-flex flex-wrap  justify-content-center gap-3 border-top pt-4">
          {filteredCards.length ? (
            filteredCards.map((card, index) => (
              <div
                className={`card px-0 ${darkMode ? "cardDark" : "cardLight"}`}
                style={{ width: "18rem" }}
                key={index}
              >
                <img
                  src={card.image.url}
                  className="card-img-top cursor-pointer"
                  alt={card.image.alt}
                  onClick={() => handleCardClick(card._id!)}
                />
                <div className="px-2">
                  <div className="card-body">
                    <h5 className="card-title">{card.title}</h5>
                    <p className="card-text border-bottom">{card.subtitle}</p>
                    <p className="card-text">Phone: {card.phone}</p>
                    <p className="card-text">
                      Address:
                      {card.address.city} {card.address.houseNumber}
                      {card.address.street}
                    </p>
                    <p className="card-text">Card Number: {card.bizNumber}</p>
                  </div>
                  <div className="d-flex flex-row-reverse">
                    <p className="ms-3 cursor-pointer ">
                      <i className="fa-solid fa-phone"></i>
                    </p>
                    {user?._id && (
                      <p
                        onClick={() => handleLike(card._id!)}
                        className={`cursor-pointer ${
                          card.likes?.includes(user._id) ? "text-danger" : ""
                        }`}
                      >
                        <i className="fa-solid fa-heart"></i>
                      </p>
                    )}
                    {user?.isAdmin && (
                      <p className="cursor-pointer ">
                        <i className="fa-solid fa-trash"></i>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No cards available</p>
          )}
        </div>

        {(user?.isBusiness || user?.isAdmin) && (
          <div
            onClick={handleAddCard}
            className="buttonPlus position-fixed end-0 mb-5 me-4 rounded-circle d-flex justify-content-center align-items-center bg-primary"
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.1)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <i className="fa-solid fa-plus" style={{ color: "#ffffff" }}></i>{" "}
          </div>
        )}
      </div>
    </>
  );
};

export default Card;

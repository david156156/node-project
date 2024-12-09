import { FunctionComponent, useContext, useEffect, useState } from "react";
import { getAllCards } from "../services/cardService";
import { Card as CardInterface } from "../interfaces/Card";
import { ThemeContext } from "../contexts/ThemeContext";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

interface CardProps {}

const Card: FunctionComponent<CardProps> = () => {
  const navigat = useNavigate();
  const [cards, setCards] = useState<CardInterface[]>([]);
  const [filteredCards, setFilteredCards] = useState<CardInterface[]>([]);
  const [cardsChanged, setCardsChanged] = useState(false);
  const { searchTerm, darkMode } = useContext(ThemeContext);
  const { user } = useUser();

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
  return (
    <>
      <div className="container">
        <h4 className="text-center display-5">Cards Page</h4>
        <p className="text-center h4">
          here you can find business cards from all categories
        </p>
        <div className="container row d-flex justify-content-center gap-3 pt-3 border-top">
          {filteredCards.length ? (
            filteredCards.map((card, index) => (
              <div
                className={`card ${darkMode ? "cardDark" : "cardLight"}`}
                style={{ width: "18rem" }}
                key={index}
              >
                <img
                  src={card.image.url}
                  className="card-img-top"
                  alt={card.image.alt}
                />
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
                  <p className="ms-3">
                    <i className="fa-solid fa-phone"></i>
                  </p>
                  {user?._id && (
                    <p>
                      <i className="fa-solid fa-heart"></i>
                    </p>
                  )}
                  {user?.isAdmin && (
                    <p>
                      <i className="fa-solid fa-trash"></i>
                    </p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>No cards available</p>
          )}
        </div>
        {user?.isBusiness && (
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

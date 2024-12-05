import { FunctionComponent, useContext, useEffect, useState } from "react";
import { getAllCards } from "../services/cardService";
import { Card as CardInterface } from "../interfaces/Card";
import { ThemeContext } from "../contexts/ThemeContext";
import { useUser } from "../contexts/UserContext";

interface CardProps {}

const Card: FunctionComponent<CardProps> = () => {
  const [cards, setCards] = useState<CardInterface[]>([]);
  const [filteredCards, setFilteredCards] = useState<CardInterface[]>([]);
  const [cardsChanged, setCardsChanged] = useState(false);
  const { searchTerm } = useContext(ThemeContext);
  const { user } = useUser();

  useEffect(() => {
    getAllCards()
      .then((res) => {
        setCards(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const filtered = cards.filter((card) =>
      card.title.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
    setFilteredCards(filtered);
  }, [searchTerm]);

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
              <div className="card" style={{ width: "18rem" }} key={index}>
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
                <p className="text-end">
                  <i
                    className="fa-solid fa-phone"
                    style={{ color: "#5c5c5c" }}
                  ></i>
                </p>
              </div>
            ))
          ) : (
            <p>No cards available</p>
          )}
        </div>
        {user?.isBusiness && (
          <div
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

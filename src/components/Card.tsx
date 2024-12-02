import { FunctionComponent, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { getAllCards } from "../services/cardService";
import { Card as CardInterface } from "../interfaces/Card";

interface CardProps {}

const Card: FunctionComponent<CardProps> = () => {
  const [cards, setCards] = useState<CardInterface[]>([]);
  const [cardsChanged, setCardsChanged] = useState(false);

  useEffect(() => {
    getAllCards()
      .then((res) => {
        setCards(res.data);
      })
      .catch((err) => console.error(err));
  }, [cardsChanged]);

  return (
    <>
      <div className="container">
        <h4 className="text-center display-5">Cards Page</h4>
        <p className="text-center h4">
          here you can find business cards from all categories
        </p>
        <div className="container row d-flex justify-content-center gap-3 pt-3 border-top">
          {cards.length ? (
            cards.map((card, index) => (
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
      </div>
    </>
  );
};

export default Card;

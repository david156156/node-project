import { FunctionComponent, useEffect, useState } from "react";
import { getMyCards } from "../services/cardService";
import { Card as CardInterface } from "../interfaces/Card";
import { useUser } from "../contexts/UserContext";
import { useTheme } from "../contexts/ThemeContext";
import { useCards } from "../contexts/CardsContext";

interface MyCardsProps {}

const MyCards: FunctionComponent<MyCardsProps> = () => {
  const [myCards, setMyCards] = useState<CardInterface[]>([]);
  const { user } = useUser();
  const { darkMode } = useTheme();
  const { loading, handleLike } = useCards();

  useEffect(() => {
    if (user) {
      getMyCards()
        .then((res) => {
          setMyCards(res);
        })
        .catch((err) => console.error(err));
    }
  }, [user]);

  return (
    <div className="container">
      <h2 className="text-center my-4">My Cards</h2>
      <div className="row">
        {myCards.length ? (
          myCards.map((card, index) => (
            <div
              className={`card px-0 ${darkMode ? "cardDark" : "cardLight"}`}
              style={{ width: "18rem" }}
              key={index}
            >
              <img
                src={card.image.url}
                className="card-img-top"
                alt={card.image.alt}
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
                      onClick={() => handleLike(card._id)}
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
          <div className="col-12 text-center">
            <p>No cards found. Create your first card!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCards;

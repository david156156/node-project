import { FunctionComponent, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useCards } from "../contexts/CardsContext";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

interface FavCardsProps {}

const FavCards: FunctionComponent<FavCardsProps> = () => {
  const navigat = useNavigate();

  const { favoriteCards, fetchCards, handleLike } = useCards();
  const { darkMode } = useTheme();
  const { user } = useUser();

  const handleAddCard = () => {
    navigat("/add-card");
  };

  const handleCardClick = (id: string) => {
    navigat(`/card-details/${id}`);
  };

  if (!favoriteCards) return <div>Loading...</div>;

  return (
    <>
      <div className="container mt-5">
        <h4 className="text-center display-5">Favorite Cards</h4>
        <p className="text-center h4 mb-4">
          Here you can find all your favorite business cards.
        </p>
        <div className="container row d-flex justify-content-center gap-3  pt-4 border-top">
          {favoriteCards.length ? (
            favoriteCards.map((card, index) => (
              <div
                className={`card px-0 ${darkMode ? "cardDark" : "cardLight"}`}
                style={{ width: "18rem" }}
                key={index}
              >
                <img
                  src={card.image.url}
                  className="card-img-top cursor-pointer"
                  onClick={() => handleCardClick(card._id!)}
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
                  <div className="d-flex flex-row-reverse align-items-center gap-2 my-2">
                    <p className="m-0 p-2 cursor-pointer" title="Call">
                      <i className="fa-solid fa-phone"></i>
                    </p>

                    {user?._id && (
                      <p
                        onClick={() => handleLike(card._id!)}
                        className={`m-0 p-2 cursor-pointer ${
                          card.likes?.includes(user._id) ? "text-danger" : ""
                        }`}
                        title="Like"
                      >
                        <i className="fa-solid fa-heart"></i>
                      </p>
                    )}

                    {user?.isAdmin && (
                      <p className="m-0 p-2 cursor-pointer" title="Delete">
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

export default FavCards;

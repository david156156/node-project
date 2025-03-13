import { FunctionComponent, useEffect, useState } from "react";
import { deleteCard, getMyCards } from "../services/cardService";
import { Card } from "../interfaces/Card";
import { useUser } from "../contexts/UserContext";
import { useTheme } from "../contexts/ThemeContext";
import { useCards } from "../contexts/CardsContext";
import { useNavigate } from "react-router-dom";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

interface MyCardsProps {}

const MyCards: FunctionComponent<MyCardsProps> = () => {
  const navigat = useNavigate();
  const [myCards, setMyCards] = useState<Card[]>([]);
  const { user } = useUser();
  const { darkMode } = useTheme();
  const { handleLike, loading } = useCards();
  const [showModal, setShowModal] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      getMyCards()
        .then((res) => {
          setMyCards(res);
        })
        .catch((err) => console.error(err));
    }
  }, [loading]);

  const handleShowModal = (cardId: string) => {
    setSelectedCardId(cardId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCardId(null);
  };

  const handlEdit = (cardId: string) => {
    navigat(`/my-cards/${cardId}`);
  };

  const handleCardClick = (id: string) => {
    navigat(`/card-details/${id}`);
  };

  const handleAddCard = () => {
    navigat("/add-card");
  };

  if (!myCards) return <div>No cards found. Create your first card!</div>;

  return (
    <div className="container mt-5">
      <h4 className="text-center my-4 display-5">My Cards</h4>
      <div className="container row d-flex justify-content-center gap-3 pt-4 border-top">
        {myCards.length ? (
          myCards.map((card, index) => (
            <div
              className={`card px-0 ${darkMode ? "cardDark" : "cardLight"}`}
              style={{ width: "18rem" }}
              key={index}
            >
              <img
                src={card.image.url}
                onClick={() => handleCardClick(card._id!)}
                className="card-img-top cursor-pointer"
                alt={card.title}
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

                  {user && (
                    <>
                      <p
                        onClick={() => handleLike(card._id!)}
                        className={`m-0 p-2 cursor-pointer ${
                          card.likes?.includes(user._id) ? "text-danger" : ""
                        }`}
                        title="Like"
                      >
                        <i className="fa-solid fa-heart"></i>
                      </p>

                      <p
                        onClick={() => handlEdit(card._id!)}
                        className="m-0 p-2 cursor-pointer"
                        title="Edit"
                      >
                        <i className="fa-solid fa-pen"></i>
                      </p>

                      <p
                        onClick={() => handleShowModal(card._id!)}
                        className="m-0 p-2 cursor-pointer"
                        title="Delete"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <p>No cards available</p>
          </div>
        )}
      </div>
      {(user?.isBusiness || user?.isAdmin) && (
        <div
          onClick={handleAddCard}
          className="buttonPlus position-fixed end-0 mb-5 me-4 rounded-circle d-flex justify-content-center align-items-center bg-primary"
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <i className="fa-solid fa-plus" style={{ color: "#ffffff" }}></i>{" "}
        </div>
      )}
      <ConfirmDeleteModal
        show={showModal}
        cardId={selectedCardId!}
        handleClose={handleCloseModal}
      />
    </div>
  );
};

export default MyCards;

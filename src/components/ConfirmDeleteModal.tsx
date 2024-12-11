import { FunctionComponent } from "react";
import { Button, Modal } from "react-bootstrap";
import { deleteCard } from "../services/cardService";
import { useCards } from "../contexts/CardsContext";

interface ConfirmDeleteModalProps {
  show: boolean;
  cardId: string;
  handleClose: () => void;
}

const ConfirmDeleteModal: FunctionComponent<ConfirmDeleteModalProps> = ({
  show,
  cardId,
  handleClose,
}) => {
  const { setLoading } = useCards();

  const handleDelete = async () => {
    if (cardId) {
      try {
        setLoading(true);
        await deleteCard(cardId);
        handleClose();
      } catch (error) {
        console.error("Error deleting card:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this card?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ConfirmDeleteModal;

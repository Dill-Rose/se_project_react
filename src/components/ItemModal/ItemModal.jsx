import "./ItemModal.css";
import closeImage from "../../assets/union.png";

function ItemModal({ card, handleCloseClick, isOpen, handleDeleteItem }) {
  return (
    <div className={`modal ${isOpen ? "modal__opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button
          type="button"
          className="modal__close"
          onClick={handleCloseClick}
        >
          <img src={closeImage} alt="close" />
        </button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
          <button
            type="button"
            onClick={() => {
              console.log("cARD id:", card._id);
              handleDeleteItem(card._id);
            }}
            className="modal__delete"
          >
            Delete Item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;

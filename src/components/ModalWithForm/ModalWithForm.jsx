import "./ModalWithForm.css";
import close from "../../assets/close.png";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  handleCloseClick,
  onSubmit,
}) {
  return (
    <div className={`modal ${isOpen ? "modal__opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          type="button"
          className="modal__close"
          onClick={handleCloseClick}
        >
          <img src={close} alt="Close icon" />
        </button>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;

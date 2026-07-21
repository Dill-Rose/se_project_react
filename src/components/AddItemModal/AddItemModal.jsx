import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ isOpen, onAddItem, handleCloseClick }) => {
  const defaultValues = {
    name: "",
    imageUrl: "",
    weather: "",
  };
  const { values, errors, isValid, handleChange, handleReset } = useFormWithValidation(defaultValues);

  function handleSubmit(evt) {
    evt.preventDefault();
    if (isValid) {
      onAddItem(values, handleReset);
    }
  }

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      handleCloseClick={handleCloseClick}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      isValid={isValid}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          name="name"
          id="clothing-name"
          placeholder="Name"
          required
          value={values.name}
          onChange={handleChange}
        />
        {errors.name && <span className="modal__error">{errors.name}</span>}
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image
        <input
          type="url"
          className="modal__input"
          id="clothing-imageUrl"
          name="imageUrl"
          placeholder="Image URL"
          required
          value={values.imageUrl}
          onChange={handleChange}
        />
        {errors.imageUrl && <span className="modal__error">{errors.imageUrl}</span>}
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label_type_radio">
          <input
            name="weather"
            type="radio"
            className="modal__radio-input"
            id="hot"
            value="hot"
            onChange={handleChange}
            checked={values.weather === "hot"}
          />
          Hot
        </label>
        <label htmlFor="warm" className="modal__label_type_radio">
          <input
            name="weather"
            type="radio"
            className="modal__radio-input"
            id="warm"
            value="warm"
            onChange={handleChange}
            checked={values.weather === "warm"}
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label_type_radio">
          <input
            name="weather"
            type="radio"
            className="modal__radio-input"
            id="cold"
            value="cold"
            onChange={handleChange}
            checked={values.weather === "cold"}
          />
          Cold
        </label>
      </fieldset>
      {errors.weather && <span className="modal__error">{errors.weather}</span>}
    </ModalWithForm>
  );
};

export default AddItemModal;

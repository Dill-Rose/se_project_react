import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const EditProfileModal = ({ isOpen, handleEditProfile, handleCloseClick }) => {
  const defaultValues = {
    name: "",
    avatar: "",
  };
  const { values, errors, isValid, handleChange, handleReset } =
    useFormWithValidation(defaultValues);

  function handleSubmit(evt) {
    evt.preventDefault();
    if (isValid) {
      handleEditProfile(values, handleReset);
    }
  }

  return (
    <ModalWithForm
      title="Edit Profile"
      buttonText="Save Changes"
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
          id="name-edit"
          placeholder="Name"
          required
          value={values.name}
          onChange={handleChange}
        />
        {errors.name && <span className="modal__error">{errors.name}</span>}
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar
        <input
          type="text"
          className="modal__input"
          name="avatar"
          id="avatar-edit"
          placeholder="Avatar URL"
          value={values.avatar}
          onChange={handleChange}
        />
      </label>
      {errors.avatar && <span className="modal__error">{errors.avatar}</span>}
    </ModalWithForm>
  );
};

export default EditProfileModal;

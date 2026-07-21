import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({ isOpen, handleLogin, handleCloseClick }) => {
  const defaultValues = {
    email: "",
    password: "",
  };
  const { values, errors, isValid, handleChange, handleReset } =
    useFormWithValidation(defaultValues);

  function handleSubmit(evt) {
    evt.preventDefault();
    if (isValid) {
      handleLogin(values, handleReset);
    }
  }

  return (
    <ModalWithForm
      title="Log In"
      buttonText="Log in"
      handleCloseClick={handleCloseClick}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      isValid={isValid}
    >
      <label htmlFor="email" className="modal__label">
        Email
        <input
          type="email"
          className="modal__input"
          name="email"
          id="email-login"
          placeholder="Email"
          required
          value={values.email}
          onChange={handleChange}
        />
        {errors.email && <span className="modal__error">{errors.email}</span>}
      </label>
      <label htmlFor="password" className="modal__label">
        Password
        <input
          type="password"
          className="modal__input"
          id="password-login"
          name="password"
          placeholder="Password"
          required
          value={values.password}
          onChange={handleChange}
        />
        {errors.password && (
          <span className="modal__error">{errors.password}</span>
        )}
      </label>
    </ModalWithForm>
  );
};

export default LoginModal;

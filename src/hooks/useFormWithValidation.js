import { useState, useEffect } from "react";

export function useFormWithValidation(defaultValues) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  function validateField(name, value) {
    let error = "";
    if (name === "name") {
      if (!value.trim()) error = "Name is required";
    } else if (name === "imageUrl") {
      if (!value.trim()) error = "Image URL is required";
      else if (!isValidUrl(value)) error = "Please enter a valid URL";
    } else if (name === "weather") {
      if (!value) error = "Please select a weather type";
    } else if (name === "email") {
      if (!value.trim()) error = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        error = "Please enter a valid email address";
    } else if (name === "password") {
      if (!value.trim()) error = "Password is required";
      else if (value.length < 6)
        error = "Password must be at least 6 characters long";
    } else if (name === "avatar") {
      if (!value.trim()) error = "Avatar URL is required";
      else if (!isValidUrl(value)) error = "Please enter a valid URL";
    }
    return error;
  }

  function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setValues({ ...values, [name]: value });
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  }

  function handleReset() {
    setValues(defaultValues);
    setErrors({});
  }

  useEffect(() => {
    const hasErrors = Object.values(errors).some((error) => error !== "");
    const allFilled = Object.keys(values).every((key) => values[key] !== "");
    setIsValid(!hasErrors && allFilled);
  }, [values, errors]);

  return { values, errors, isValid, handleChange, handleReset };
}

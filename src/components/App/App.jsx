import { useEffect, useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import { Routes, Route } from "react-router-dom";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import Profile from "../Profile/Profile";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, apiKey } from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import {
  getItems,
  addItem,
  deleteItem,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import ProtectedRoute from "../ProtectedRoute";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import { getUser, register, signin } from "../../utils/auth";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: "" },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [currentUser, setCurrentUser] = useState({
    name: "",
    avatar: "",
    email: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleRegistration = (
    { name, avatar, email, password },
    handleReset,
  ) => {
    register(name, avatar, email, password)
      .then(() => signin(email, password))
      .then((data) => {
        console.log("Login successful:", data);
        localStorage.setItem("jwt", data.token);
        console.log("Registration successful:", data);
        handleReset();
        closeModal();
        setCurrentUser(data);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.error("Registration failed:", error);
      });
  };

  const handleLogin = (values, handleReset) => {
    signin(values.email, values.password)
      .then((data) => {
        console.log("Login successful:", data);
        localStorage.setItem("jwt", data.token);
        setCurrentUser(data);
        setIsLoggedIn(true);
        handleReset();
        closeModal();
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser({ name: "", avatar: "", email: "" });
  };

  const handleEditProfile = (values, handleReset) => {
    console.log("Profile updated:", values);
    setCurrentUser({ ...currentUser, ...values });
    handleReset();
    closeModal();
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      getUser(token)
        .then((data) => {
          setCurrentUser(data);
          setIsLoggedIn(true);
        })
        .catch((error) => {
          console.error("Error during token validation:", error);
        });
    }
  }, []);

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    // Check if this card is not currently liked
    !isLiked
      ? // if so, send a request to add the user's id to the card's likes array
        addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item)),
            );
          })
          .catch((err) => console.log(err))
      : // if not, send a request to remove the user's id from the card's likes array
        removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item)),
            );
          })
          .catch((err) => console.log(err));
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleOpenRegistrationModal = () => {
    setActiveModal("register");
  };

  const handleOpenLoginModal = () => {
    setActiveModal("login");
  };

  const handleOpenEditProfileModal = () => {
    setActiveModal("edit-profile");
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser({ name: "", avatar: "", email: "" });
  };

  const handleDeleteItem = (itemId) => {
    deleteItem(itemId)
      .then(() => {
        setClothingItems((prev) =>
          prev.filter((item) => {
            return item._id !== itemId;
          }),
        );
        closeModal();
      })
      .catch(console.error);
  };

  const onAddItem = (inputValues, handleReset) => {
    const newCardData = {
      name: inputValues.name,
      imageUrl: inputValues.imageUrl,
      weather: inputValues.weather,
    };
    addItem(newCardData)
      .then((data) => {
        setClothingItems((prev) => [data, ...prev]);
        handleReset();
        closeModal();
      })
      .catch(console.error);
  };

  const closeModal = () => {
    setActiveModal("");
  };

  const isAddGarmentModalOpen = activeModal === "add-garment";
  const isItemModalOpen = activeModal === "preview";
  const isRegistrationModalOpen = activeModal === "register";
  const isLoginModalOpen = activeModal === "login";
  const isEditProfileModalOpen = activeModal === "edit-profile";

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);

    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentUserContext.Provider value={{ currentUser, isLoggedIn }}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              openRegistrationModal={handleOpenRegistrationModal}
              openLoginModal={handleOpenLoginModal}
              handleLogout={handleLogout}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    clothingItems={clothingItems}
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    handleCardLike={handleCardLike}
                    currentUser={currentUser}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile
                      clothingItems={clothingItems}
                      handleCardClick={handleCardClick}
                      handleCardLike={handleCardLike}
                      handleAddClick={handleAddClick}
                      onSignOut={handleSignOut}
                      openEditProfileModal={handleOpenEditProfileModal}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <Footer />
          </div>
          {/* <ModalWithForm></ModalWithForm> */}
          <AddItemModal
            isOpen={isAddGarmentModalOpen}
            handleCloseClick={closeModal}
            onAddItem={onAddItem}
          ></AddItemModal>
          <ItemModal
            isOpen={isItemModalOpen}
            card={selectedCard}
            handleCloseClick={closeModal}
            handleDeleteItem={handleDeleteItem}
          />
          <RegisterModal
            isOpen={isRegistrationModalOpen}
            handleCloseClick={closeModal}
            handleRegistration={handleRegistration}
          />
          <LoginModal
            isOpen={isLoginModalOpen}
            handleCloseClick={closeModal}
            handleLogin={handleLogin}
          />
          <EditProfileModal
            isOpen={isEditProfileModalOpen}
            handleCloseClick={closeModal}
            handleEditProfile={handleEditProfile}
          />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

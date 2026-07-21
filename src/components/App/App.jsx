import { useEffect, useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import { Routes, Route } from "react-router-dom";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, apiKey } from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { getItems } from "../../utils/api";
import { addItem } from "../../utils/api";
import { deleteItem } from "../../utils/api";
import ProtectedRoute from "../ProtectedRoute";
import CurrentUserContext from "../../contexts/CurrentuserContext";
import RegisterModal from "../RegisterModal/RegisterModal";

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
    { name, avatar, email, password, confirmPassword },
    handleReset,
  ) => {
    if (password === confirmPassword) {
      auth
        .register(name, avatar, email, password)
        .then(() => auth.signin(email, password))
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
    }
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
                      handleAddClick={handleAddClick}
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
          />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

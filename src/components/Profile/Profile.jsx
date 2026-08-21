import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

function Profile({
  clothingItems,
  handleCardClick,
  handleAddClick,
  onSignOut,
  openEditProfileModal,
  handleCardLike,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          onSignOut={onSignOut}
          openEditProfileModal={openEditProfileModal}
        />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          clothingItems={clothingItems}
          handleCardClick={handleCardClick}
          handleAddClick={handleAddClick}
          handleCardLike={handleCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;

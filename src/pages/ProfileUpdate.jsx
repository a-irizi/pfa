import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { updateResearcher } from "../features/researchers/researchersSlice";

import "../styles/profileUpdate.css";

const ProfileUpdate = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector((store) => store.userId);
  const [user, setUser] = useState(
    useSelector((store) => store.researchers.find((r) => r.id === userId))
  );

  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(user.profile);

  function handleChange(e) {
    const { name, value, type, files } = e.target;
    setUser((old) => ({
      ...old,
      [name]: type === "file" ? files[0] : value,
    }));
  }

  function handleImageChange(e) {
    e.preventDefault();
    setImage(e.target.files[0]);
  }

  useEffect(() => {
    const extensionExtractor = /(?:\.([^.]+))?$/;
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const { result } = e.target;
      setImageFile(result);
    };
    if (image !== null) {
      fileReader.readAsDataURL(image);
    }

    return () => {
      fileReader.abort();
    };
  }, [image]);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(updateResearcher({ ...user, profile: imageFile }));
    navigate("/profile");
  }

  return (
    <main>
      <form encType="multipart/form-data">
        <div>
          <div className="profile-image__container">
            <img className="profile-image__picture" src={imageFile} alt="" />
            <input type="file" name="profile" onChange={handleImageChange} />
          </div>
        </div>
        <div>
          <label htmlFor="firstName-id">Prenom</label>
          <input
            id="firstName-id"
            type="text"
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="lastName-id">Nom</label>
          <input
            id="lastName-id"
            type="text"
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>
            valider
          </button>
        </div>
      </form>
    </main>
  );
};

export default ProfileUpdate;

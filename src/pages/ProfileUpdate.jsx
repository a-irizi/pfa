import { React, useState } from "react";
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

  function handleChange(e) {
    const { name, value, type, files } = e.target;
    setUser((old) => ({
      ...old,
      [name]: type === "file" ? files[0] : value,
    }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(updateResearcher({ ...user }));
    navigate("/profile");
  }

  return (
    <main>
      <form encType="multipart/form-data">
        <div>
          <div className="profile-image__container">
            <img className="profile-image__picture" src={user.profile} alt="" />
          </div>
          <input type="file" name="profile" onChange={handleChange} />
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
          <label htmlFor="email-id">email</label>
          <input
            id="email-id"
            type="email"
            name="email"
            value={user.email}
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

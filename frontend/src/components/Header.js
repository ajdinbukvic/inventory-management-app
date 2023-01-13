import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser, SET_LOGIN } from "../helpers/auth";
import { logoutUser } from "../services/authService";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  console.log(user);
  const logout = async () => {
    await logoutUser();
    await dispatch(SET_LOGIN(false));
    navigate("/login");
  };

  return (
    <div className="--pad header">
      <div className="--flex-between">
        <h3>
          <span className="--fw-thin">Dobro došao, </span>
          <span className="--color-primary">{user.username}</span>
        </h3>
        <button onClick={logout} className="--btn --btn-danger">
          Odjava
        </button>
      </div>
      <hr />
    </div>
  );
};

export default Header;

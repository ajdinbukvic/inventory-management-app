import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser, SET_LOGIN, SET_USER } from "../helpers/auth";
import { logoutUser } from "../services/authService";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const logout = async () => {
    await logoutUser();
    await dispatch(SET_LOGIN(false));
    await dispatch(SET_USER({}));
    navigate("/login");
  };

  return (
    <div className="--pad header">
      <div className="--flex-between">
        <h3>
          <span className="--fw-thin">Dobro došao, </span>
          <span className="--color-primary">{user.username}</span>
          &nbsp;
          <span className="--color-danger">[ {user.role} ]</span>
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

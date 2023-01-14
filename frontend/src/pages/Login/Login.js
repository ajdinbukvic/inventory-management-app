import React, { useState, useEffect } from "react";
import "./Login.css";
import { BiLogIn } from "react-icons/bi";
import Card from "../../components/card/Card";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { loginUser } from "../../services/authService";
import { selectIsLoggedIn, SET_LOGIN, SET_USER } from "../../helpers/auth";

const initialState = {
  username: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [navigate, isLoggedIn]);
  const [formData, setformData] = useState(initialState);
  const { username, password } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const login = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      return toast.error("Morate popuniti sva polja!");
    }

    const userData = {
      username,
      password,
    };
    try {
      const data = await loginUser(userData);
      console.log(data);
      if (data) {
        await dispatch(SET_LOGIN(true));
        await dispatch(SET_USER(data.data.user));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg">
      <div className="container auth">
        <Card>
          <div className="form">
            <div className="--flex-center">
              <BiLogIn size={35} color="#999" />
            </div>
            <h2>Login</h2>

            <form onSubmit={login}>
              <input
                type="text"
                placeholder="Korisničko ime"
                required
                name="username"
                value={username}
                onChange={handleInputChange}
              />
              <input
                type="password"
                placeholder="Lozinka"
                required
                name="password"
                value={password}
                onChange={handleInputChange}
              />
              <button type="submit" className="--btn --btn-primary --btn-block">
                Prijava
              </button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;

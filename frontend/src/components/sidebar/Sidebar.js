import React, { useState } from "react";
import "./Sidebar.css";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineInventory } from "react-icons/md";
import menu from "./Menu";
import { useSelector } from "react-redux";
import SidebarItem from "./SidebarItem";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../helpers/auth";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="layout">
      <div className="sidebar" style={{ width: isOpen ? "230px" : "60px" }}>
        <div className="top_section">
          <div className="logo" style={{ display: isOpen ? "block" : "none" }}>
            <MdOutlineInventory
              size={35}
              style={{ cursor: "pointer" }}
              onClick={goHome}
            />
          </div>

          <div
            className="bars"
            style={{ marginLeft: isOpen ? "100px" : "0px" }}
          >
            <HiMenuAlt3 onClick={toggle} />
          </div>
        </div>
        {menu.map((item, index) => {
          if (user.role === "employee" && index === 1) {
            return null;
          }
          return <SidebarItem key={index} item={item} isOpen={isOpen} />;
        })}
      </div>

      <main
        style={{
          paddingLeft: isOpen ? "230px" : "60px",
          transition: "all .5s",
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default Sidebar;

import { FaTh } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { AiOutlineStock } from "react-icons/ai";
import { TbTruckDelivery } from "react-icons/tb";
import { RiLockPasswordFill } from "react-icons/ri";

const menu = [
  {
    title: "Početna",
    icon: <FaTh />,
    path: "/",
  },
  {
    title: "Zaposlenici",
    icon: <FaUsers />,
    path: "/employees",
  },
  {
    title: "Zalihe",
    icon: <AiOutlineStock />,
    path: "/supplies",
  },
  {
    title: "Dobavljači",
    icon: <TbTruckDelivery />,
    path: "/suppliers",
  },
  {
    title: "Promjena lozinke",
    icon: <RiLockPasswordFill />,
    path: "/change-password",
  },
];

export default menu;

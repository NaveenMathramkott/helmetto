import React from "react";
import "./style.css";

const TAB_DATA = [
  {
    to: "/dashboard/user/orders",
    name: "Orders",
  },
  {
    to: "/dashboard/user/profile",
    name: "Profile",
  },
];
const UserMenu = ({ onClick, active }) => {
  return (
    <div className="userMenu-group">
      {TAB_DATA.map((tabItem) => (
        <ul
          key={tabItem.name}
          className={`list-group-item-user ${
            active === tabItem.name ? "onSelect-userMenu" : ""
          }`}
          onClick={onClick}
        >
          {tabItem.name}
        </ul>
      ))}
    </div>
  );
};

export default UserMenu;

import React from "react";
import "./style.css";

const TAB_DATA = [
  {
    to: "/dashboard/admin/orders",
    name: "Orders",
  },
  {
    to: "/dashboard/admin/create-category",
    name: "Categories",
  },
  {
    to: "/dashboard/admin/create-product",
    name: "Products",
  },
];
const AdminMenu = ({ onClick, active }) => {
  return (
    <div className="adminMenu-group">
      {TAB_DATA.map((tabItem) => (
        <ul
          key={tabItem.name}
          className={`list-group-item ${
            active === tabItem.name ? "onSelect-adminMenu" : ""
          }`}
          onClick={onClick}
        >
          {tabItem.name}
        </ul>
      ))}
    </div>
  );
};

export default AdminMenu;

import React, { useState } from "react";
import { Drawer } from "antd";
import { GiHamburgerMenu } from "react-icons/gi";

const DrawerTab = ({ children, nav, title }) => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div
        onClick={showDrawer}
        style={{ display: "flex", alignItems: "center" }}
      >
        <GiHamburgerMenu size={30} />
      </div>
      <Drawer
        title={title}
        extra={<div>{nav}</div>}
        onClose={onClose}
        open={open}
      >
        {children}
      </Drawer>
    </>
  );
};

export default DrawerTab;

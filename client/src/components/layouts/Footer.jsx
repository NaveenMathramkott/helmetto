import React from "react";
import "./styles.css";
import { FaWhatsapp } from "react-icons/fa";
import { MdAddCall } from "react-icons/md";
import google from "../../assets/googlePlay.jpg";
import apple from "../../assets/appleStore.jpg";
import webIcon from "../../assets/brand-name.png";

const Footer = () => {
  return (
    <div className="footer-mainWrapper">
      <div className="footer-container">
        <div className="footer-mainSection">
          <img src={webIcon} alt="webIcon" width={120} height={50} />
        </div>

        <div className="footer-content-container">
          <div className="sectionOne">
            <h5 className="space">Contact Us</h5>
            <div className="space">
              <FaWhatsapp />
              +971 974422 4047
            </div>
            <div className="space">
              <MdAddCall />
              +971 974422 4047
            </div>
            <div className="space">
              <img src={google} alt="google play store" />
              <img src={apple} alt="apple store" />
            </div>
          </div>
          <div className="sectionTwo space">
            <h4>Most Popular Categories</h4>
            <ul>Custom Helmets</ul>
            <ul>Branded Helmets</ul>
            <ul>Accessories</ul>
          </div>
          <div className="sectionThree space">
            <h4>Customer Service</h4>
            <ul>About Us</ul>
            <ul>FAQ</ul>
            <ul>Privacy Policy</ul>
          </div>
        </div>
      </div>
      <div id="bottom-footer">©2024 All Rights Reserved. Amouxtek</div>
    </div>
  );
};

export default Footer;

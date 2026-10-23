import React, { useState } from "react";
import {
  FiPhone,
  FiMessageSquare,
  FiGlobe,
  FiMail,
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiYoutube,
  FiLinkedin,
  FiMapPin,
  FiClock,
  FiCheckCircle,
  FiTruck,
  FiShield,
  FiRotateCcw,
  FiTag,
  FiChevronRight,
} from "react-icons/fi";
import google from "../../assets/googlePlay.jpg";
import apple from "../../assets/appleStore.jpg";
import webIcon from "../../assets/brand-name.png";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      alert("Thanks for subscribing!");
      setEmail("");
    }
  };

  const footerLinks = {
    shop: [
      { label: "All Helmets", href: "/productCatList" },
      { label: "Custom Helmets", href: "/productCatList?cat=custom" },
      { label: "Branded Helmets", href: "/productCatList?cat=branded" },
      { label: "Accessories", href: "/productCatList?cat=accessories" },
      { label: "New Arrivals", href: "/productCatList?sort=new" },
      { label: "Best Sellers", href: "/productCatList?sort=best" },
    ],
    help: [
      { label: "FAQs", href: "/faq" },
      { label: "Shipping Info", href: "/shipping" },
      { label: "Returns & Exchanges", href: "/returns" },
      { label: "Size Guide", href: "/size-guide" },
      { label: "Track Order", href: "/track-order" },
      { label: "Contact Us", href: "/contact" },
    ],
    company: [
      { label: "About Us", href: "/about" },
      { label: "Our Story", href: "/about#story" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
      { label: "Blog", href: "/blog" },
      { label: "Affiliate Program", href: "/affiliate" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Refund Policy", href: "/refund-policy" },
      { label: "GDPR", href: "/gdpr" },
    ],
  };

  const benefits = [
    { icon: FiTruck, title: "Free Shipping", desc: "Orders over ₹999" },
    { icon: FiShield, title: "Secure Payment", desc: "100% encrypted" },
    { icon: FiRotateCcw, title: "Easy Returns", desc: "30-day policy" },
    { icon: FiTag, title: "Best Price", desc: "Price match guarantee" },
  ];

  const socialLinks = [
    { icon: FiFacebook, href: "https://facebook.com", label: "Facebook" },
    { icon: FiInstagram, href: "https://instagram.com", label: "Instagram" },
    { icon: FiTwitter, href: "https://twitter.com", label: "Twitter" },
    { icon: FiYoutube, href: "https://youtube.com", label: "YouTube" },
    { icon: FiLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
  ];

  const contactInfo = [
    {
      icon: FiMapPin,
      label: "Visit Us",
      value: "123 Helmet Street, Safety City, SC 12345",
    },
    { icon: FiPhone, label: "Call Us", value: "+91 97442 24047" },
    { icon: FiMessageSquare, label: "WhatsApp", value: "+91 97442 24047" },
    { icon: FiMail, label: "Email Us", value: "support@helmetto.com" },
    {
      icon: FiClock,
      label: "Business Hours",
      value: "Mon-Sat: 9AM - 8PM, Sun: 10AM - 6PM",
    },
  ];

  return (
    <footer className="bg-primary text-white">
      {/* Top Section - Brand & Newsletter */}
      <div className="container mx-auto px-4 py-12 md:px-10 border-b border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <img
              src={webIcon}
              alt="Helmetto"
              width={140}
              height={60}
              className="mb-6"
            />
            <p className="text-gray-300 text-base leading-relaxed mb-8 max-w-xs">
              Your trusted destination for premium helmets and safety gear.
              Combining style, comfort, and certified protection for every
              rider.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3 mb-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm text-gray-300 bg-white/5 px-3 py-2 rounded-lg border border-white/10"
                >
                  <benefit.icon className="h-4 w-4 text-teal-400 flex-shrink-0" />
                  <span className="font-medium text-white">
                    {benefit.title}
                  </span>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h5 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
                Follow Us
              </h5>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:bg-teal-500/20 hover:border-teal-500/50 hover:text-teal-400 transition-all duration-300"
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:col-span-2">
            {Object.entries(footerLinks).map(([key, links]) => (
              <div key={key}>
                <h5 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </h5>
                <ul className="space-y-3">
                  {links.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-gray-300 hover:text-teal-400 transition-colors text-sm font-medium relative group inline-flex items-center gap-1"
                      >
                        {link.label}
                        <FiChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all duration-200 text-teal-400" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Middle Section - Newsletter & Contact */}
      <div className="container mx-auto px-4 py-12 md:px-10 border-b border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          {/* Newsletter */}
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-teal-500/20 flex items-center justify-center">
                <FiMail className="h-6 w-6 text-teal-400" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white">Stay Updated</h4>
                <p className="text-gray-400 text-sm">
                  Get latest offers, new arrivals & safety tips
                </p>
              </div>
            </div>
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-3 max-w-md"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-teal-400 focus:bg-white/10 transition-all"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-teal-500 hover:bg-teal-400 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
              >
                Subscribe
                <FiChevronRight className="h-4 w-4" />
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-4 text-center">
              No spam, unsubscribe anytime.{" "}
              <a href="/privacy" className="underline hover:text-teal-400">
                Privacy Policy
              </a>
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 flex items-center justify-center">
                <FiMessageSquare className="h-5 w-5 text-teal-400" />
              </div>
              Get in Touch
            </h4>
            <div className="space-y-4">
              {contactInfo.map((contact, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-teal-500/50 transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center flex-shrink-0">
                    <contact.icon className="h-5 w-5 text-teal-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                      {contact.label}
                    </p>
                    <p className="text-gray-200 text-sm">{contact.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Copyright & Payment Methods */}
      <div className="container mx-auto px-4 py-8 md:px-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Helmetto. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs mt-1">
              A brand by NMS Pvt. Ltd.
            </p>
          </div>

          {/* Payment Methods */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-3">
            <span className="text-gray-500 text-xs mr-2">Secure payments:</span>
            <div className="flex gap-2">
              {[
                "Visa",
                "Mastercard",
                "RuPay",
                "UPI",
                "NetBanking",
                "Wallet",
              ].map((method, i) => (
                <div
                  key={i}
                  className="px-3 py-1 bg-white/5 border border-white/10 rounded text-xs font-medium text-gray-300"
                >
                  {method}
                </div>
              ))}
            </div>
          </div>

          {/* Made with love */}
          <div className="text-center md:text-right">
            <p className="text-gray-500 text-xs flex items-center justify-center md:justify-end gap-1">
              Made with <span className="text-red-500">♥</span> for riders in
              India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
      </Helmet>
      <Header />
      <main style={{ minHeight: "80vh" }}>
        <Toaster position="bottom-right" />
        {children}
      </main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "Ecommerce app",
  description: "mern stack, threejs project",
  keywords: "mern,react,threejs,node,express,mongodb",
  author: "naveenmathramkott",
};

export default Layout;

import React, { useEffect, useState } from "react";
import Layout from "../../components/layouts/Layout";
import { useNavigate } from "react-router-dom";
import "./style.css";
import axios from "axios";
import { Carousel, Radio } from "antd";
import ProductCard from "../../components/productCard/ProductCard";
import SectionHeader from "../../components/sectionHeader/SectionHeader";
import CategoryCard from "../../components/category/CategoryCard";
import { PRICE_DATA } from "../../constant/constant";
import toast from "react-hot-toast";
import {
  CategorySkeleton,
  ProductSkeleton,
} from "../../components/skeleton/Skeleton";

const HomePage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllCategory();
  }, []);

  useEffect(() => {
    if (!radio.length || !checked.length) getAllProducts();
  }, [radio.length, checked.length]);

  useEffect(() => {
    if (radio.length || checked.length) filterProduct();
  }, [radio, checked]);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/product/get-product`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/product/product-filters`,
        {
          radio,
          checked,
        }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={`all-products-Emart`}>
      <div className="mainContaner">
        {/* category header start*/}
        <div className="cat-header">
          <Radio.Group
            size="middle"
            onChange={(e) => setRadio(e.target.value)}
            buttonStyle="solid"
            style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}
          >
            {PRICE_DATA?.map((item) => (
              <Radio
                key={item.id}
                value={item.range}
                style={{
                  borderRadius: "8px",
                  border: "1px solid #008ecc",
                  padding: "2px 4px",
                }}
              >
                {item.name}
              </Radio>
            ))}
          </Radio.Group>
        </div>
        {/* category header end */}
        {/* carousel start */}
        <div>
          <Carousel autoplay>
            <div>
              <img
                className="carousel-style"
                alt="home-screen-product"
                src="https://i.pinimg.com/564x/d6/e8/69/d6e8690bcc922224ace9cf1a2410c8a3.jpg"
              />
            </div>
            <div>
              <img
                className="carousel-style"
                alt="home-screen-product"
                src="https://i.pinimg.com/564x/9d/7b/1f/9d7b1f682cfddeb77d0a9f18f04973b4.jpg"
              />
            </div>
            <div>
              <img
                className="carousel-style"
                alt="home-screen-product"
                src="https://i.pinimg.com/564x/60/fc/d5/60fcd5c646686fc4550ab4097449cfb1.jpg"
              />
            </div>
            <div>
              <img
                className="carousel-style"
                alt="home-screen-product"
                src="https://i.pinimg.com/564x/ea/b3/1b/eab31b6f8f09f900447ce0ce1c169d47.jpg"
              />
            </div>
          </Carousel>
        </div>
        {/* carousel end */}
        {/* shop top category start*/}
        {categories.length > 0 ? (
          <div className="spacer-mainWrapper">
            <SectionHeader
              heading={`Shop from top Categories`}
              onClick={() => toast.success("Please select the below category")}
            />
            <div className="category-header">
              {categories?.map((item) => (
                <CategoryCard
                  key={item._id}
                  name={item.name}
                  image={item.photo}
                  onClick={() =>
                    navigate("/productCatList", { state: item, navigate })
                  }
                />
              ))}
            </div>
          </div>
        ) : (
          <div style={{ padding: "20px" }}>
            <CategorySkeleton />
          </div>
        )}
        {/* shop category ends */}
        {/* best deals start */}
        {products.length > 0 ? (
          <div className="spacer-mainWrapper">
            <SectionHeader
              heading={`Grab the best deals on spares`}
              onClick={() => toast.success("You can see all the product below")}
            />
            <div className="deals-header">
              {products?.map((item) => (
                <div key={item._id}>
                  <ProductCard
                    data={item}
                    onClick={() => navigate(`/product/${item.slug}`)}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <ProductSkeleton />
          </div>
        )}
        {/* best deals end */}
      </div>
    </Layout>
  );
};

export default HomePage;

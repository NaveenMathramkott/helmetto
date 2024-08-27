import React, { useEffect, useState } from "react";
import Layout from "../../components/layouts/Layout";
import { useNavigate } from "react-router-dom";
import "./style.css";
import axios from "axios";
import { Carousel, Radio } from "antd";
import ProductCard from "../../components/productCard/ProductCard";
import SectionHeader from "../../components/sectionHeader/SectionHeader";
import CategoryCard from "../../components/category/CategoryCard";
import { CAROUSEL_DATA, PRICE_DATA } from "../../constant/constant";
import toast from "react-hot-toast";
import NoData from "../../components/noData/NoData";
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
  const [productLoading, setProductLoading] = useState(false);
  const [categoryLoading, setCategoryLoading] = useState(false);

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
      setProductLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/product/get-product`
      );
      setProducts(data.products);
      setProductLoading(false);
    } catch (error) {
      setProductLoading(false);
      console.log(error);
    }
  };

  const getAllCategory = async () => {
    try {
      setCategoryLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
        setCategoryLoading(false);
      }
    } catch (error) {
      setCategoryLoading(false);
      console.log(error);
    }
  };

  const filterProduct = async () => {
    try {
      setCategoryLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/product/product-filters`,
        {
          radio,
          checked,
        }
      );
      setProducts(data?.products);
      setCategoryLoading(false);
    } catch (error) {
      setCategoryLoading(false);
      console.log(error);
    }
  };

  return (
    <Layout title={`All products Helmetto helmets`}>
      <div className="mainContaner">
        {/* category header start*/}
        <div>
          <Radio.Group
            size="middle"
            onChange={(e) => setRadio(e.target.value)}
            buttonStyle="solid"
            style={{ display: "flex", flexWrap: "wrap" }}
            className="radio-group"
          >
            {PRICE_DATA?.map((item) => (
              <Radio key={item.id} value={item.range} className="radio-section">
                {item.name}
              </Radio>
            ))}
          </Radio.Group>
        </div>
        {/* category header end */}
        {/* carousel start */}
        <div>
          <Carousel autoplay>
            {CAROUSEL_DATA.map((item) => (
              <div>
                <img
                  className="carousel-style"
                  alt="home-screen-product"
                  src={item.source}
                />
              </div>
            ))}
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
            {!categoryLoading ? (
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
            ) : (
              <CategorySkeleton />
            )}
          </div>
        ) : (
          <div style={{ padding: "20px" }}>
            <NoData />
          </div>
        )}
        {/* shop category ends */}
        {/* best deals start */}
        {products.length > 0 ? (
          <div className="spacer-mainWrapper">
            <SectionHeader
              heading={`Grab the best deals on Helmets`}
              onClick={() => toast.success("You can see all the product below")}
            />
            {!productLoading ? (
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
            ) : (
              <ProductSkeleton />
            )}
          </div>
        ) : (
          <div>
            <NoData />
          </div>
        )}
        {/* best deals end */}
      </div>
    </Layout>
  );
};

export default HomePage;

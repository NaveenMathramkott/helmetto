import React, { useEffect, useState } from "react";
import Layout from "../../components/layouts/Layout";
import ProductCard from "../../components/productCard/ProductCard";
import { Radio } from "antd";
import { PRICE_DATA } from "../../constant/constant";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ProductCatList = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState([location?.state?._id]);
  const [radio, setRadio] = useState([]);

  useEffect(() => {
    setChecked([location?.state?._id]);
  }, []);

  useEffect(() => {
    if (radio.length || checked.length) filterProduct();
  }, [radio, checked]);

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

  const toProductDetailPage = (item) => {
    navigate("/product", { state: item });
  };
  return (
    <Layout title={`${location?.state?.name}-CategoryList-Emart`}>
      <div className="productCat-mainWrapper">
        <div className="productCat-header">
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
        <div className="productCat-body">
          <div className="productCat-body-header">
            <h3>{`${location?.state?.name} Category List`}</h3>
          </div>
          <div className="productCat-data-list">
            {products?.map((item) => (
              <div key={item?._id}>
                <ProductCard
                  data={item}
                  onClick={() => toProductDetailPage(item)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductCatList;

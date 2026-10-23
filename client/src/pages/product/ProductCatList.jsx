import React, { useEffect, useState } from "react";
import Layout from "../../components/layouts/Layout";
import ProductCard from "../../components/productCard/ProductCard";
import { PRICE_DATA } from "../../constant/constant";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import NoData from "../../components/noData/NoData";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Label } from "../../components/ui/label";

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
        },
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const toProductDetailPage = (item) => {
    navigate(`/product/${item.slug}`, { state: item });
  };

  return (
    <Layout title={`${location?.state?.name}-CategoryList-Helmetto`}>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <RadioGroup
            onValueChange={setRadio}
            value={radio}
            className="flex flex-wrap gap-2"
          >
            {PRICE_DATA?.map((item) => (
              <div key={item.id} className="flex items-center gap-2">
                <RadioGroupItem value={item.range} className="sr-only" />
                <Label className="rounded-md border border-primary px-3 py-1 text-sm cursor-pointer transition-colors hover:bg-primary/10">
                  {item.name}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="productCat-body">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground">
              {`${location?.state?.name} Category List`}
            </h2>
          </div>
          {products.length !== 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products?.map((item) => (
                <div key={item?._id}>
                  <ProductCard
                    data={item}
                    onClick={() => toProductDetailPage(item)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <NoData title={"No Product found in this category"} />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProductCatList;

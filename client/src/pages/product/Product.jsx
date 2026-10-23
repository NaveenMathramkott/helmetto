import React, { useEffect, useState } from "react";
import Layout from "../../components/layouts/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { getOffer } from "../../utils/utils";
import { useCart } from "../../context/cartProvider";
import toast from "react-hot-toast";
import axios from "axios";
import Loader from "../../components/loader/Loader";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";

const Product = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { cart, setCart } = useCart();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/product/get-product/${params.slug}`,
      );
      setProduct(data?.product);
    } catch (error) {
      console.log(error);
    }
  };

  const onAddToCart = (prod) => {
    const checkCart = cart.filter((itm) => itm._id === prod._id);
    if (checkCart.length >= 1) {
      toast.success("Already Added to the cart");
    } else {
      setCart([...cart, prod]);
      localStorage.setItem("cart", JSON.stringify([...cart, prod]));
      toast.success("Item Added to cart");
    }
  };

  if (!product) {
    return (
      <Layout title={`Product - Helmetto`}>
        <div className="flex justify-center items-center min-h-[60vh]">
          <Loader />
        </div>
      </Layout>
    );
  }

  const discountedPrice = getOffer(product.price, product.offer);

  return (
    <Layout title={`${product.name}-Product-Helmetto`}>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <img
                src={product.photo}
                alt={product.name}
                className="w-full h-[400px] md:h-[500px] object-contain bg-gray-50"
              />
            </CardContent>
          </Card>

          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-foreground">
              {product.name}
            </h1>
            <p className="text-muted-foreground text-lg">
              {product.description}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <span className="text-2xl font-bold text-primary">
                ₹ {discountedPrice}
              </span>
              {product.offer > 0 && (
                <>
                  <span className="text-xl text-muted-foreground line-through">
                    ₹ {product.price}
                  </span>
                  <Badge variant="success" className="text-sm">
                    {product.offer}% off
                  </Badge>
                </>
              )}
              <span className="text-sm text-green-600">
                Save ₹ {(product.offer * product.price) / 100}
              </span>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                onClick={() => onAddToCart(product)}
                className="w-full sm:w-auto flex-1 bg-green-600 hover:bg-green-700 text-white"
                size="lg"
              >
                Add to Cart
              </Button>
              <Button
                onClick={() => navigate("/configurator", { state: product })}
                variant="outline"
                className="w-full sm:w-auto flex-1 border-primary text-primary hover:bg-primary/10"
                size="lg"
              >
                Customize
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Product;

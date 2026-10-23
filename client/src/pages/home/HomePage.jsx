import React, { useEffect, useState } from "react";
import Layout from "../../components/layouts/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../../components/ui/carousel";
import ProductCard from "../../components/productCard/ProductCard";
import SectionHeader from "../../components/sectionHeader/SectionHeader";
import CategoryCard from "../../components/category/CategoryCard";
import { CAROUSEL_DATA, PRICE_DATA } from "../../constant/constant";
import toast from "react-hot-toast";
import NoData from "../../components/noData/NoData";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Label } from "../../components/ui/label";
import {
  CategorySkeleton,
  ProductSkeleton,
} from "../../components/skeleton/Skeleton";
import {
  FiTag,
  FiTruck,
  FiShield,
  FiRotateCcw,
  FiChevronRight,
} from "react-icons/fi";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

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
    getAllProducts();
    filterProduct();
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
        `${process.env.REACT_APP_BASE_URL}/api/v1/product/get-product`,
      );
      setProducts(data.products);
      setProductLoading(false);
    } catch (error) {
      setProductLoading(false);
    } finally {
      setProductLoading(false);
    }
  };

  const getAllCategory = async () => {
    try {
      setCategoryLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/category/get-category`,
      );
      if (data?.success) {
        setCategories(data?.category);
        setCategoryLoading(false);
      }
    } catch (error) {
      setCategoryLoading(false);
    } finally {
      setCategoryLoading(false);
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
        },
      );
      setProducts(data?.products);
      setCategoryLoading(false);
    } catch (error) {
      setCategoryLoading(false);
    } finally {
      setProductLoading(false);
    }
  };

  const features = [
    { icon: FiTruck, title: "Free Shipping", desc: "On orders over ₹999" },
    { icon: FiShield, title: "Secure Payment", desc: "100% secure checkout" },
    { icon: FiRotateCcw, title: "Easy Returns", desc: "30-day return policy" },
    { icon: FiTag, title: "Best Price", desc: "Guaranteed lowest price" },
  ];

  return (
    <Layout title={`Helmetto - Premium Helmets & Accessories`}>
      <div className="min-h-screen">
        {/* Price Filter Section */}
        <section className="py-6 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4">
            <RadioGroup
              onValueChange={setRadio}
              value={radio}
              className="flex flex-wrap justify-center gap-2"
            >
              {PRICE_DATA?.map((item) => (
                <div key={item.id} className="flex items-center gap-2">
                  <RadioGroupItem value={item.range} className="sr-only" />
                  <Label className="rounded-full border border-gray-200 dark:border-gray-700 px-4 py-1.5 text-sm font-medium cursor-pointer transition-all duration-200 hover:bg-primary/5 hover:border-primary/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary">
                    {item.name}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </section>

        {/* Hero Carousel - Smaller */}
        <section className="relative py-8">
          <div className="container mx-auto px-4">
            <Carousel
              opts={{
                loop: true,
                align: "center",
                slidesToScroll: 1,
                duration: 25,
              }}
              plugins={[]}
              className="rounded-2xl overflow-hidden shadow-xl max-w-6xl mx-auto"
            >
              <CarouselContent>
                {CAROUSEL_DATA.map((item) => (
                  <CarouselItem
                    key={item.id}
                    className="relative h-[50vh] min-h-[350px] max-h-[500px] w-full"
                  >
                    <div className="absolute inset-0">
                      <img
                        src={item.source}
                        alt="Helmetto Collection"
                        className="w-full h-full object-cover"
                      />
                      {/* Dark overlay for text readability */}
                      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
                    </div>
                    <div className="relative h-full flex items-center px-8">
                      <div className="max-w-xl">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                          Discover Premium Helmets
                        </h2>
                        <p className="text-lg md:text-xl text-white/90 mb-6 font-light">
                          Safety meets style. Explore our curated collection of
                          certified helmets.
                        </p>
                        <Button
                          size="lg"
                          className="gap-2 text-lg px-8 py-3 bg-white text-primary hover:bg-primary/10 border-2 border-white hover:border-primary"
                          onClick={() => navigate("/productCatList")}
                        >
                          Shop Now
                          <FiChevronRight className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </section>

        {/* Trust Features */}
        <section className="py-10 bg-white dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900/30">
          <div className="container mx-auto px-4">
            <SectionHeader
              heading="Shop by Category"
              subheading="Explore our curated helmet collections"
              onClick={() => toast.success("Browse all categories")}
            />

            {!categoryLoading ? (
              categories.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mt-8">
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
                <div className="text-center py-12">
                  <NoData title="No Categories Available" />
                </div>
              )
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mt-8">
                {[...Array(6)].map((_, i) => (
                  <CategorySkeleton key={i} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Products Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <SectionHeader
              heading="Best Deals on Helmets"
              subheading="Top rated helmets at unbeatable prices"
              onClick={() => navigate("/productCatList")}
            />

            {!productLoading ? (
              products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
                  {products?.map((item) => (
                    <ProductCard
                      key={item._id}
                      data={item}
                      onClick={() => navigate(`/product/${item.slug}`)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <NoData title="No Products Found" />
                </div>
              )
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
                {[...Array(8)].map((_, i) => (
                  <ProductSkeleton key={i} />
                ))}
              </div>
            )}

            {/* View All Button */}
            <div className="text-center mt-12">
              <Button
                variant="outline"
                size="lg"
                className="px-10 py-3 border-2 border-primary text-primary hover:bg-primary/5"
                onClick={() => navigate("/productCatList")}
              >
                View All Products
                <FiChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default HomePage;

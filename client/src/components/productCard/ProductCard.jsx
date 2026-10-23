import React from "react";
import { getOffer, textShorter } from "../../utils/utils";
import { useCart } from "../../context/cartProvider";
import toast from "react-hot-toast";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { FiShoppingCart, FiHeart } from "react-icons/fi";

const ProductCard = ({ data, onClick }) => {
  const { cart, setCart } = useCart();

  const discountedPrice = getOffer(data?.price, data?.offer);
  const savings = ((data?.offer * data?.price) / 100).toFixed(0);

  const onAddToCart = (e, prod) => {
    e.stopPropagation();
    const checkCart = cart.filter((itm) => itm._id === prod._id);
    if (checkCart.length >= 1) {
      toast.success("Already in cart");
    } else {
      setCart([...cart, prod]);
      localStorage.setItem("cart", JSON.stringify([...cart, prod]));
      toast.success("Added to cart");
    }
  };

  return (
    <article className="group product-card relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/20 dark:hover:border-primary/30">
      {/* Image Container */}
      <div
        className="relative aspect-square overflow-hidden bg-gray-50 dark:bg-gray-700/50"
        onClick={onClick}
      >
        <img
          src={data?.photo}
          alt={data?.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Offer Badge */}
        {data?.offer > 0 && (
          <Badge
            variant="destructive"
            className="absolute top-3 left-3 z-10 text-xs font-medium px-2 py-1"
          >
            -{data.offer}%
          </Badge>
        )}

        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <Button
            variant="default"
            size="icon"
            className="w-10 h-10 bg-white/90 hover:bg-white text-primary shadow-lg"
            onClick={(e) => onAddToCart(e, data)}
            aria-label="Add to cart"
          >
            <FiShoppingCart className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-10 h-10 bg-white/90 hover:bg-white text-gray-700 shadow-lg"
            aria-label="Add to wishlist"
          >
            <FiHeart className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Category/Name */}
        <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-1 group-hover:text-primary transition-colors">
          {textShorter(data?.name, 30)}
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-primary">
            ₹ {discountedPrice}
          </span>
          {data?.offer > 0 && (
            <>
              <span className="text-sm text-gray-400 line-through">
                ₹ {data?.price}
              </span>
              <Badge variant="secondary" className="text-xs px-2 py-0.5">
                Save ₹{savings}
              </Badge>
            </>
          )}
        </div>

        {/* View Details Button */}
        <Button
          variant="outline"
          className="w-full mt-2 text-sm gap-2 justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 border-primary text-primary hover:bg-primary/5"
          onClick={onClick}
        >
          View Details
          <FiShoppingCart className="h-4 w-4" />
        </Button>
      </div>
    </article>
  );
};

export default ProductCard;

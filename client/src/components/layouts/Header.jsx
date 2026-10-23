import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authProvider";
import toast from "react-hot-toast";
import webIcon from "../../assets/brand-name.png";
import mobIcon from "../../assets/logo.png";
import {
  FiUserPlus,
  FiShoppingCart,
  FiUser,
  FiSearch,
  FiMapPin,
  FiTruck,
  FiTag,
  FiMenu,
  FiLogOut,
  FiX,
} from "react-icons/fi";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../../components/ui/dropdown-menu";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import axios from "axios";
import { useCart } from "../../context/cartProvider";
import { debounce } from "../../utils/utils";

const Header = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const [productList, setProductList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [auth, setAuth] = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleLogout = () => {
    setIsDialogOpen(false);
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
    navigate("/");
  };

  const searchProduct = async (event) => {
    let response = [];
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/product/search/${event}`,
      );
      response = data?.map((item) => ({
        value: item.name,
        label: item.name,
        item,
      }));
      setProductList(response);
    } catch (error) {
      setProductList(response);
      console.log(error);
    }
  };

  const onChangeSearchInput = debounce(searchProduct, 1000);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onChangeSearchInput(value);
  };

  const handleSearchSelect = (option) => {
    if (option?.item?.slug) {
      navigate(`/product/${option.item.slug}`);
      setSearchQuery("");
    }
  };

  return (
    <>
      <nav className="bg-primary text-white px-4 py-2 md:px-10 hidden md:flex items-center justify-between border-b border-primary/50">
        <span className="text-sm font-light">Welcome to Helmetto E-store</span>
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <FiMapPin className="text-teal-400" size={16} />
            <span>Deliver to 680516</span>
          </div>
          <div className="w-px h-5 bg-gray-600" />
          <div className="flex items-center gap-2">
            <FiTruck className="text-teal-400" size={16} />
            <span>Track your Order</span>
          </div>
          <div className="w-px h-5 bg-gray-600" />
          <div className="flex items-center gap-2">
            <FiTag className="text-teal-400" size={16} />
            <span>All Offers</span>
          </div>
        </div>
      </nav>

      <nav className="bg-primary px-4 py-3 md:px-10 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img
            src={webIcon}
            alt="Helmetto"
            width={120}
            height={50}
            className="md:block hidden"
          />
          <img
            src={mobIcon}
            alt="Helmetto"
            width={50}
            height={30}
            className="md:hidden block"
          />
          <span className="font-bold text-xl text-primary flex items-center">
            <sup className="bg-yellow-400 text-xs px-1 rounded">Beta</sup>
          </span>
        </Link>

        <div className="flex items-center gap-4 md:flex-1 max-w-2xl mx-4">
          <div className="relative w-full">
            <FiSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              type="text"
              placeholder="Search products"
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10 pr-10 bg-gray-50 border-gray-200 focus:border-primary focus:ring-primary/20"
              autoComplete="off"
            />
            {productList.length > 0 && searchQuery && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-auto">
                {productList.map((option) => (
                  <button
                    key={option.item._id}
                    onClick={() => handleSearchSelect(option)}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors flex items-center gap-2"
                  >
                    <span className="flex-1 text-sm">{option.item.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {!auth.user ? (
            <Link to="/login">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:text-teal-400 hover:bg-transparent"
              >
                <FiUserPlus className="mr-2" size={16} />
                <span>Sign In</span>
              </Button>
            </Link>
          ) : (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:text-teal-400 hover:bg-transparent gap-2"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(auth.user.name)}&background=0a1828&color=fff`}
                        alt={auth.user.name}
                      />
                      <AvatarFallback>
                        {auth.user.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:block font-medium">
                      {auth.user.name}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem
                    onClick={() =>
                      navigate(
                        `/dashboard/${auth.user.admin ? "admin" : "user"}`,
                      )
                    }
                  >
                    <FiUser className="mr-2 h-4 w-4" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-600 focus:text-red-600"
                  >
                    <FiLogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link to="/cart">
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative text-white hover:text-teal-400 hover:bg-transparent gap-2"
                >
                  <FiShoppingCart className="text-xl" />
                  <span className="hidden sm:block font-medium">Cart</span>
                  {cart.length > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 min-w-5 rounded-full bg-red-500 text-white text-xs font-medium">
                      {cart.length > 9 ? "9+" : cart.length}
                    </Badge>
                  )}
                </Button>
              </Link>
            </>
          )}

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white"
              >
                <FiMenu className="h-6 w-6" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm sm:max-w-md" side="right">
              <DialogHeader>
                <DialogTitle>Menu</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-4 mt-6">
                <div className="relative">
                  <FiSearch
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <Input
                    type="text"
                    placeholder="Search products"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="pl-10"
                  />
                </div>
                {!auth.user ? (
                  <Link to="/login" onClick={() => setIsDialogOpen(false)}>
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-2"
                    >
                      <FiUserPlus className="h-4 w-4" />
                      Sign In / Sign Up
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link
                      to={`/dashboard/${auth.user.admin ? "admin" : "user"}`}
                      onClick={() => setIsDialogOpen(false)}
                    >
                      <Button
                        variant="outline"
                        className="w-full justify-start gap-2"
                      >
                        <FiUser className="h-4 w-4" />
                        Dashboard
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      onClick={handleLogout}
                      className="w-full justify-start gap-2 text-red-600"
                    >
                      <FiLogOut className="h-4 w-4" />
                      Logout
                    </Button>
                  </>
                )}
                <Link to="/cart" onClick={() => setIsDialogOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <FiShoppingCart className="h-4 w-4" />
                    Cart {cart.length > 0 && `(${cart.length})`}
                  </Button>
                </Link>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </nav>
    </>
  );
};

export default Header;

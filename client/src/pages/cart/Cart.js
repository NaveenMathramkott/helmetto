import { useEffect } from "react";
import Layout from "../../components/layouts/Layout";
import { useCart } from "../../context/cartProvider";
import ImageViewer from "../../components/imageViewer/ImageViewer";
import { textShorter } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import NoData from "../../components/noData/NoData";
import { useAuth } from "../../context/authProvider";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "../../components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import { getOffer } from "../../utils/utils";

const Cart = () => {
  const count = 1;
  const navigate = useNavigate();
  const [auth] = useAuth();
  const { cart, setCart, cartTotal, setCartTotal } = useCart();

  useEffect(() => {
    const totalCount = cart
      ?.map((item) => {
        if (item?.parts) {
          const data = item?.parts
            ?.map((innerItem) => {
              if (innerItem.price) {
                return innerItem.price;
              } else {
                return null;
              }
            })
            .reduce(
              (accumulator, currentValue) => accumulator + currentValue,
              0,
            );
          const totalData = (item.price + data) * item.total;
          return totalData;
        } else {
          return item.price * item.total;
        }
      })
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    setCartTotal(totalCount);
    localStorage.setItem("cartTotal", JSON.stringify(totalCount));
  }, [cart]);

  const getTotalForCustom = (arr, quantity) => {
    const totalArr = arr
      ?.map((innerItem) => {
        if (innerItem.price) {
          return innerItem.price;
        } else {
          return null;
        }
      })
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    return totalArr * quantity;
  };

  const addItem = (id) => {
    const selectedProduct = cart.filter((itm) => {
      if (itm._id === id) {
        itm.total += count;
      }
      return itm;
    });
    const totalCount = selectedProduct
      .map((item) => item.price * item.total)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    setCartTotal(totalCount);
    setCart(selectedProduct);
    localStorage.setItem("cart", JSON.stringify(selectedProduct));
    localStorage.setItem("cartTotal", JSON.stringify(totalCount));
  };

  const removeItem = (id) => {
    const filteredData = cart?.filter((itm) => {
      if (itm._id === id && itm.total !== 1) {
        itm.total -= count;
        return itm;
      } else if (itm._id !== id) return itm;
    });
    const totalCount = filteredData
      .map((item) => item.price * item.total)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    setCartTotal(totalCount);
    setCart(filteredData);
    localStorage.setItem("cart", JSON.stringify(filteredData));
    localStorage.setItem("cartTotal", JSON.stringify(totalCount));
  };

  const toPaymentPage = () => {
    navigate(`/payment`);
  };

  return (
    <Layout title={`Cart Helmetto`}>
      {!auth?.user?.admin ? (
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground">
              Shopping Cart
            </h2>
          </div>

          {cart.length > 0 ? (
            <>
              <Card className="mb-6">
                <CardHeader className="pb-0">
                  <CardTitle>Items ({cart.length})</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">#</TableHead>
                          <TableHead className="w-24">Photo</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead className="w-40">Quantity</TableHead>
                          <TableHead className="w-32">Custom</TableHead>
                          <TableHead className="w-32">Price</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {cart?.map((item, index) => (
                          <TableRow key={item?._id}>
                            <TableCell className="text-center">
                              {index + 1}
                            </TableCell>
                            <TableCell className="text-center">
                              {item?.parts ? (
                                <div className="relative inline-block">
                                  <Badge
                                    variant="destructive"
                                    className="absolute -top-1 -right-1 text-xs"
                                  >
                                    Custom
                                  </Badge>
                                  <ImageViewer
                                    src={item?.photo}
                                    alt={item?.name}
                                  />
                                </div>
                              ) : (
                                <ImageViewer
                                  src={item?.photo}
                                  alt={item?.name}
                                />
                              )}
                            </TableCell>
                            <TableCell className="max-w-xs truncate">
                              {textShorter(item?.name)}
                            </TableCell>
                            <TableCell className="text-center">
                              <div className="flex items-center justify-center gap-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => removeItem(item?._id)}
                                  disabled={item?.total <= 1}
                                  className="h-8 w-8"
                                >
                                  -
                                </Button>
                                <span className="w-8 text-center">
                                  {item?.total}
                                </span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => addItem(item?._id)}
                                  className="h-8 w-8"
                                >
                                  +
                                </Button>
                              </div>
                            </TableCell>
                            <TableCell className="text-center">
                              {item?.parts ? (
                                <span>
                                  ₹{" "}
                                  {getTotalForCustom(item?.parts, item?.total)}
                                </span>
                              ) : (
                                <span className="text-muted-foreground">
                                  Standard
                                </span>
                              )}
                            </TableCell>
                            <TableCell className="text-right font-medium">
                              ₹ {item?.total * item?.price}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:items-end">
                <Button
                  variant="ghost"
                  onClick={() => navigate("/")}
                  className="md:w-auto w-full"
                >
                  ← Continue Shopping
                </Button>
                <div className="md:w-auto w-full">
                  <Button
                    onClick={() => {
                      if (auth.token) {
                        toPaymentPage();
                      } else {
                        navigate("/login", { state: "/cart" });
                      }
                    }}
                    disabled={cartTotal === 0}
                    className="w-full md:w-auto bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3"
                    size="lg"
                  >
                    {auth.token
                      ? `Continue Payment ₹${cartTotal}`
                      : `Please login to Checkout`}
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="py-12 text-center">
              <NoData title={"No Items in Cart"} />
              <Button
                variant="outline"
                onClick={() => navigate("/")}
                className="mt-4"
              >
                Continue Shopping
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8">
          <NoData title={"No cart Preview for Admin"} />
        </div>
      )}
    </Layout>
  );
};

export default Cart;

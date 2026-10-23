import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/authProvider";
import axios from "axios";
import NoData from "../../components/noData/NoData";
import ImageViewer from "../../components/imageViewer/ImageViewer";
import moment from "moment";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../../components/ui/table";
import { Badge } from "../../components/ui/badge";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const getOrders = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/order/orders`,
        {
          id: auth?.user?._id,
        },
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Delivered":
        return <Badge variant="success">{status}</Badge>;
      case "Shipped":
        return <Badge variant="default">{status}</Badge>;
      case "Processing":
        return <Badge variant="secondary">{status}</Badge>;
      case "Cancelled":
        return <Badge variant="destructive">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle>My Orders</CardTitle>
          <p className="text-sm text-muted-foreground">
            Number of orders: {orders?.length}
          </p>
        </CardHeader>
        <CardContent className="pt-0">
          {orders.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">#</TableHead>
                    <TableHead className="w-32">Status</TableHead>
                    <TableHead className="w-40">Date</TableHead>
                    <TableHead className="w-32">Payment</TableHead>
                    <TableHead className="w-24">Items</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders?.map((item, index) => (
                    <React.Fragment key={item._id}>
                      <TableRow>
                        <TableCell className="text-center">
                          {index + 1}
                        </TableCell>
                        <TableCell>{getStatusBadge(item?.status)}</TableCell>
                        <TableCell>
                          {moment(item?.createAt).fromNow()}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              item?.payment?.success ? "success" : "destructive"
                            }
                          >
                            {item?.payment?.success ? "Success" : "Failed"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          {item?.products?.length}
                        </TableCell>
                      </TableRow>
                      {item?.products?.map((prod, i) => (
                        <TableRow
                          key={`${item._id}-${i}`}
                          className="bg-muted/30"
                        >
                          <TableCell />
                          <TableCell className="text-center">
                            <ImageViewer src={prod.photo} alt={prod.name} />
                          </TableCell>
                          <TableCell className="max-w-xs truncate">
                            {prod.name}
                          </TableCell>
                          <TableCell className="max-w-md truncate">
                            {prod.description.substring(0, 50)}
                          </TableCell>
                          <TableCell>₹ {prod.price}</TableCell>
                          <TableCell className="text-center">
                            {prod.total}
                          </TableCell>
                        </TableRow>
                      ))}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="py-12 text-center">
              <NoData title="No orders found" />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Orders;

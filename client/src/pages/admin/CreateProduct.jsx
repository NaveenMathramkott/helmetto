import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import UploadButton from "../../components/uploadbutton/UploadButton";
import ImageViewer from "../../components/imageViewer/ImageViewer";
import NoData from "../../components/noData/NoData";
import { textShorter } from "../../utils/utils";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
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

const CreateProduct = () => {
  const [createProductTab, setCreateProductTab] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [offer, setOffer] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    getAllCategory();
    getAllProducts();
  }, [imageLoading]);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/product/get-product`,
      );
      setAllProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const loadImageFile = (photoFile) => {
    const imageData = photoFile[0]?.originFileObj;
    setImageLoading(true);
    if (imageData?.type === "image/jpeg" || imageData?.type === "image/png") {
      const data = new FormData();
      data.append("file", imageData);
      data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);
      data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_NAME);

      fetch(process.env.REACT_APP_CLOUDINARY_URL, {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          setImage(res.url.toString());
          setImageLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setImageLoading(false);
        });
    } else {
      setImageLoading(false);
      return;
    }
  };

  const clearFunction = () => {
    setName("");
    setDescription("");
    setPrice("");
    setOffer("");
    setQuantity("");
    setCategory("");
    setImage("");
  };

  const onAddProduct = async (event) => {
    event.preventDefault();
    if (
      !name ||
      !description ||
      !price ||
      !offer ||
      !quantity ||
      !category ||
      !image
    ) {
      return toast.error(`Fill all the fields to submit`);
    }
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/product/create-product`,
        {
          name: name,
          description: description,
          price: price,
          category: category,
          quantity: quantity,
          photo: image,
          offer: offer,
          total: 1,
        },
      );
      console.log("data", res);
      if (res && res.data.success) {
        toast.success(res.data.message);
        clearFunction();
        setCreateProductTab(false);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/category/get-category`,
      );
      if (data?.success) {
        setAllCategories(data?.category);
        setCategory(data?.category[0]?._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full">
      {!createProductTab ? (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>All Products</CardTitle>
              <p className="text-sm text-muted-foreground">
                Number of products: {allProducts?.length}
              </p>
            </div>
            <Button onClick={() => setCreateProductTab(true)}>
              Add Product
            </Button>
          </CardHeader>
          <CardContent className="pt-0">
            {allProducts.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">#</TableHead>
                      <TableHead className="w-20">Photo</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="w-24">Price</TableHead>
                      <TableHead className="w-20">Offer</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="w-20">Quantity</TableHead>
                      <TableHead className="w-32">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allProducts?.map((item, index) => (
                      <TableRow key={item._id}>
                        <TableCell className="text-center">
                          {index + 1}
                        </TableCell>
                        <TableCell className="text-center">
                          <ImageViewer src={item.photo} alt={item.name} />
                        </TableCell>
                        <TableCell className="max-w-xs truncate">
                          {textShorter(item.name)}
                        </TableCell>
                        <TableCell className="max-w-md truncate">
                          {textShorter(item.description)}
                        </TableCell>
                        <TableCell>₹ {item.price}</TableCell>
                        <TableCell>
                          <Badge
                            variant={item.offer > 0 ? "success" : "secondary"}
                          >
                            {item.offer}%
                          </Badge>
                        </TableCell>
                        <TableCell>{item.category?.name}</TableCell>
                        <TableCell className="text-center">
                          {item.quantity}
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            <Button variant="destructive" size="sm">
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="py-12 text-center">
                <NoData />
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>New Product</CardTitle>
          </CardHeader>
          <form
            onSubmit={onAddProduct}
            id="product-form"
            className="space-y-6 p-6"
          >
            <CardContent className="pt-0 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="productImage">Product Image</Label>
                <div className="flex items-center gap-4">
                  {image && (
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden border">
                      <ImageViewer src={image} alt="Product preview" />
                    </div>
                  )}
                  <UploadButton getImageData={(data) => loadImageFile(data)} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="productName">Product Name</Label>
                <Input
                  id="productName"
                  type="text"
                  placeholder="Product name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="productDescription">Description</Label>
                <Textarea
                  id="productDescription"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[100px]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="productPrice">Price (₹)</Label>
                  <Input
                    id="productPrice"
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="productOffer">Offer (%)</Label>
                  <Input
                    id="productOffer"
                    type="number"
                    placeholder="Offer"
                    value={offer}
                    onChange={(e) => setOffer(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="productQuantity">Quantity</Label>
                  <Input
                    id="productQuantity"
                    type="number"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="productCategory">Category</Label>
                <Select value={category} onValueChange={setCategory} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {allCategories?.map((itm, index) => (
                      <SelectItem key={`${index}-${itm.slug}`} value={itm._id}>
                        {itm.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="submit">Add Product</Button>
            </CardFooter>
          </form>
        </Card>
      )}
    </div>
  );
};

export default CreateProduct;

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import UploadButton from "../../components/uploadbutton/UploadButton";
import ImageViewer from "../../components/imageViewer/ImageViewer";
import NoData from "../../components/noData/NoData";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
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

const CreateCategory = () => {
  const [createCategoryTab, setCreateCategoryTab] = useState(false);
  const [category, setCategory] = useState("");
  const [allCategories, setAllCategories] = useState([]);

  const [image, setImage] = useState("");
  const [imageLoading, setImageLoading] = useState(false);

  useEffect(() => {
    getAllCategory();
  }, [imageLoading]);

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
      toast.error("Please Select an Image!");
      setImageLoading(false);
      return;
    }
  };

  const onAddCategory = async (event) => {
    event.preventDefault();
    if (!image && !category) {
      toast.error(`Please add an Image and Category`);
    } else {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/api/v1/category/create-category`,
          {
            name: category,
            photo: image,
          },
        );
        if (res && res.data.success) {
          toast.success(res.data.message);
          setCategory("");
          setImage("");
          setCreateCategoryTab(false);
        } else {
          toast.error(res.data.message);
          setCreateCategoryTab(false);
        }
      } catch (error) {
        toast.error(error);
      }
    }
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/category/get-category`,
      );
      if (data?.success) {
        setAllCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full">
      {!createCategoryTab ? (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>All Categories</CardTitle>
            <Button onClick={() => setCreateCategoryTab(true)}>
              Add Category
            </Button>
          </CardHeader>
          <CardContent className="pt-0">
            {allCategories.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">#</TableHead>
                      <TableHead className="w-24">Photo</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className="w-24">Slug</TableHead>
                      <TableHead className="w-32">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allCategories?.map((item, index) => (
                      <TableRow key={item._id}>
                        <TableCell className="text-center">
                          {index + 1}
                        </TableCell>
                        <TableCell className="text-center">
                          <ImageViewer src={item.photo} alt={item.name} />
                        </TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.slug}</TableCell>
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
            <CardTitle>New Category</CardTitle>
          </CardHeader>
          <form
            onSubmit={onAddCategory}
            id="category-form"
            className="space-y-6 p-6"
          >
            <CardContent className="pt-0 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="categoryImage">Category Image</Label>
                <div className="flex items-center gap-4">
                  {image && (
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden border">
                      <ImageViewer src={image} alt="Category preview" />
                    </div>
                  )}
                  <UploadButton getImageData={(data) => loadImageFile(data)} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="categoryName">Category Name</Label>
                <Input
                  id="categoryName"
                  type="text"
                  placeholder="Category name"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="submit">Add Category</Button>
            </CardFooter>
          </form>
        </Card>
      )}
    </div>
  );
};

export default CreateCategory;

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import UploadButton from "../../components/uploadbutton/UploadButton";
import ImageViewer from "../../components/imageViewer/ImageViewer";
import NoData from "../../components/noData/NoData";

const CreateCategory = () => {
  const [createCategoryTab, setCreateCategoryTab] = useState(false);
  const [category, setCategory] = useState("");
  const [allCategories, setAllCategories] = useState([]);

  const [image, setImage] = useState();
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
      toast.error(`Please add a Image and Category`);
    } else {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/api/v1/category/create-category`,
          {
            name: category,
            photo: image,
          }
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
        `${process.env.REACT_APP_BASE_URL}/api/v1/category/get-category`
      );
      if (data?.success) {
        setAllCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="product-list-mainWrapper">
      {!createCategoryTab ? (
        <table className="product-box-container">
          <tr className="product-box-header">
            <div className="product-box-header-left">
              <h3>All Categories</h3>
              <span>{`Number of Categories : ${allCategories.length}`}</span>
            </div>
            <div className="product-box-header-right">
              <button onClick={() => setCreateCategoryTab(true)}>
                Add Category
              </button>
            </div>
          </tr>
          {allCategories.length > 0 ? (
            <>
              <tr className="product-list-heading">
                <th className="id">id</th>
                <th className="photo">Photo</th>
                <th className="name">Name</th>
                <th className="edit">Edit</th>
                <th className="delete">Delete</th>
              </tr>
              <div>
                {allCategories?.map((item, index) => (
                  <tr className="product-list-data">
                    <td className="id">{index + 1}</td>
                    <td className="photo">
                      <ImageViewer src={item.photo} alt={item.name} />
                    </td>
                    <td className="name">{item.slug}</td>
                    <td className="edit">
                      <button>Edit</button>
                    </td>
                    <td className="delete">
                      <button>Delete</button>
                    </td>
                  </tr>
                ))}
              </div>
            </>
          ) : (
            <>
              <NoData />
            </>
          )}
        </table>
      ) : (
        <div className="create-product-container">
          <form onSubmit={onAddCategory}>
            <h3>New Category</h3>
            <div className="input-group">
              <label htmlFor="inputName">Category Image</label>
              <div className="icon-btn" style={{ padding: "10px" }}>
                <UploadButton getImageData={(data) => loadImageFile(data)} />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="inputCategory" className="form-label">
                Category
              </label>
              <div className="icon-btn">
                <input
                  type="text"
                  placeholder="Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{ width: "100%" }}
                />
              </div>
            </div>

            <div className="btn-group-product">
              <button type="submit" id={"btn-login"}>
                Add Category
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreateCategory;

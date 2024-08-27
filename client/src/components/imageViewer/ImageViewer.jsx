import React, { useState } from "react";
import { Modal, Button } from "antd";
import "./style.css";

const ImageViewer = ({ src, alt }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div onClick={showModal} className="imageViewer-hover-div">
        <img src={src} alt={alt} className="image-viewer-btn" />
      </div>
      <Modal
        title={alt}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            cancel
          </Button>,
        ]}
      >
        <img src={src} alt={alt} id="image-viewer-modal" />
      </Modal>
    </>
  );
};

export default ImageViewer;

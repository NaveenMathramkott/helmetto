import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";

const ImageViewer = ({ src, alt }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <div onClick={() => setIsDialogOpen(true)} className="cursor-zoom-in">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{alt}</DialogTitle>
          </DialogHeader>
          <div className="p-4">
            <img
              src={src}
              alt={alt}
              className="w-full h-auto max-h-[70vh] object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageViewer;

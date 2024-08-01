import React, { useState, useEffect, useCallback } from "react";
import {
  Overlay,
  ImageContainer,
  Image,
  IconButton,
  CloseButton,
  ZoomControls,
} from "./EnlargedImageStyle.jsx";
import PropTypes from 'prop-types';




const CloseIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18 6L6 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 6L18 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PlusIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 5V19"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 12H19"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MinusIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 12H19"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const EnlargedImage = ({ src, alt, onClose }) => {
  const [scale, setScale] = useState(1);
  const minScale = 0.5;
  const maxScale = 3;

  const handleWheel = useCallback((e) => {
    e.preventDefault();
    setScale((prevScale) => {
      const newScale = prevScale - e.deltaY * 0.01;
      return Math.min(Math.max(newScale, minScale), maxScale);
    });
  }, []);

  useEffect(() => {
    const container = document.querySelector(".image-container");
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }
    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, [handleWheel]);

  const handleZoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + 0.1, maxScale));
  };

  const handleZoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.1, minScale));
  };

  EnlargedImage.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
  };


  return (
    <Overlay onClick={onClose}>
      <ImageContainer
        className="image-container"
        onClick={(e) => e.stopPropagation()}
      >
        <Image src={src} alt={alt} scale={scale} />
        <CloseButton onClick={onClose}>
          <CloseIcon />
        </CloseButton>
        <ZoomControls>
          <IconButton onClick={handleZoomOut}>
            <MinusIcon />
          </IconButton>
          <IconButton onClick={handleZoomIn}>
            <PlusIcon />
          </IconButton>
        </ZoomControls>
      </ImageContainer>
    </Overlay>
  );
};

export default EnlargedImage;

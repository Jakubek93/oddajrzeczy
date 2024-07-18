import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ImageContainer = styled.div`
  position: relative;
  max-width: 90%;
  max-height: 90%;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  transform: scale(${(props) => props.scale});
  transition: transform 0.2s ease-in-out;
`;

const IconButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;

  &:hover {
    opacity: 0.8;
  }
`;

const CloseButton = styled(IconButton)`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const ZoomControls = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  padding: 5px;
`;

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

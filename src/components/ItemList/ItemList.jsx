import React, { useState } from "react";
import styled from "styled-components";
import EnlargedImage from "../EnlargedImage/EnlargedImage.jsx";
import CommentSection from "../CommentSection/CommentSection.jsx";
import PropTypes from 'prop-types';

const ItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  width: 100%;
`;

const ItemCard = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: calc(50% - 20px);
  max-width: 500px;
  display: flex;
  flex-direction: column;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    width: 100%;
  }

  ${(props) =>
  props.$isSingle &&
  `
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
    `}
`;

const ItemImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 15px;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 0;
  padding-bottom: 75%;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  margin-bottom: 15px;
`;

const ItemName = styled.h3`
  margin: 0 0 15px 0;
  font-size: 1.4em;
  color: #333333;
`;

const ItemInfo = styled.p`
  margin: 5px 0;
  font-size: 14px;
  color: #666666;
`;

const ItemDescription = styled.p`
  margin: 15px 0;
  font-size: 14px;
  line-height: 1.6;
  color: #444444;
`;

const NoItemsMessage = styled.div`
  text-align: center;
  font-size: 18px;
  color: #666666;
  margin-top: 50px;
  width: 100%;
`;

const ItemList = ({ items }) => {
  const [enlargedImage, setEnlargedImage] = useState(null);
  const isSingleItem = items.length === 1;

  ItemList.propTypes = {
    items: PropTypes.array.isRequired
  };

  const handleImageClick = (imageUrl) => {
    setEnlargedImage(imageUrl);
  };

  if (!items || items.length === 0) {
    return <NoItemsMessage>Brak przedmiotów do wyświetlenia.</NoItemsMessage>;
  }

  return (
    <>
      <ItemContainer>
        {items.map((item) => (
          <ItemCard key={item.id} $isSingle={isSingleItem}>
            {item.image_url && (
              <ImageContainer>
                <ItemImage
                  src={item.image_url}
                  alt={item.name}
                  onClick={() => handleImageClick(item.image_url)}
                />
              </ImageContainer>
            )}
            <ItemName>{item.name}</ItemName>
            <ItemInfo>Kategoria: {item.category}</ItemInfo>
            <ItemInfo>Lokalizacja: {item.location}</ItemInfo>
            <ItemInfo>
              Data dodania: {new Date(item.created_at).toLocaleDateString()}
            </ItemInfo>
            {item.phone_number && (
              <ItemInfo>Telefon: {item.phone_number}</ItemInfo>
            )}
            <ItemDescription>{item.description}</ItemDescription>
            <CommentSection itemId={item.id} />
          </ItemCard>
        ))}
      </ItemContainer>
      {enlargedImage && (
        <EnlargedImage
          src={enlargedImage}
          alt="Powiększony obraz"
          onClose={() => setEnlargedImage(null)}
        />
      )}
    </>
  );
};


export default ItemList;


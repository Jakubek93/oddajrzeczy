import React, { useState } from "react";
import styled from "styled-components";
import EnlargedImage from "../EnlargedImage/EnlargedImage.jsx";
import CommentSection from "../CommentSection/CommentSection.jsx";
import PropTypes from 'prop-types';
import {
  ItemContainer,
  ItemCard,
  ItemImage,
  ImageContainer,
  ItemName,
  ItemInfo,
  ItemDescription,
  NoItemsMessage,
} from "./ItemListStyle.jsx"


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


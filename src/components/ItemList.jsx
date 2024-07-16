import React, { useState } from 'react';
import styled from 'styled-components';
import EnlargedImage from './EnlargedImage';

const ItemContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 20px;
    padding: 20px;
`;

const ItemCard = styled.div`
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 20px;
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    width: calc(50% - 20px);
    display: flex;
    flex-direction: column;

    @media (max-width: 768px) {
        width: 100%;
    }
`;

const ItemImage = styled.img`
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 15px;
    cursor: pointer;
`;

const ItemName = styled.h3`
    margin: 0 0 15px 0;
    font-size: 1.2em;
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
    line-height: 1.4;
    color: #444444;
`;

const ItemList = ({ items, onAddComment }) => {
    const [enlargedImage, setEnlargedImage] = useState(null);

    if (!items || items.length === 0) {
        return <div>Brak przedmiotów do wyświetlenia.</div>;
    }

    const handleImageClick = (imageUrl) => {
        setEnlargedImage(imageUrl);
    };

    const handleCloseEnlargedImage = () => {
        setEnlargedImage(null);
    };

    return (
        <>
            <ItemContainer>
                {items.map(item => (
                    <ItemCard key={item.id}>
                        {item.imageUrl && (
                            <ItemImage
                                src={item.imageUrl}
                                alt={item.name}
                                onClick={() => handleImageClick(item.imageUrl)}
                            />
                        )}
                        <ItemName>{item.name}</ItemName>
                        <ItemInfo>Kategoria: {item.category}</ItemInfo>
                        <ItemInfo>Lokalizacja: {item.location}</ItemInfo>
                        <ItemInfo>Data dodania: {new Date(item.dateAdded).toLocaleDateString()}</ItemInfo>
                        {item.phoneNumber && <ItemInfo>Telefon: {item.phoneNumber}</ItemInfo>}
                        <ItemDescription>{item.description}</ItemDescription>
                        <CommentSection
                            comments={item.comments}
                            onAddComment={(text) => onAddComment(item.id, text)}
                        />
                    </ItemCard>
                ))}
            </ItemContainer>
            {enlargedImage && (
                <EnlargedImage
                    src={enlargedImage}
                    alt="Powiększone zdjęcie"
                    onClose={handleCloseEnlargedImage}
                />
            )}
        </>
    );
};

export default ItemList;
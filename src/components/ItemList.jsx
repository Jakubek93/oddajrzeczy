import React from 'react';
import styled from 'styled-components';

const ItemListContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
`;

const NoItemsMessage = styled.p`
    color: black; 
    font-size: 18px;
    text-align: center;
    width: 100%;
    margin-top: 20px;
`;

const ItemCard = styled.div`
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 16px;
    width: calc(33.333% - 20px);
    margin-bottom: 20px;
    transition: transform 0.3s ease;

    &:hover {
        transform: translateY(-5px);
    }

    @media (max-width: 1024px) {
        width: calc(50% - 20px);
    }

    @media (max-width: 768px) {
        width: 100%;
    }
`;

const ItemImage = styled.img`
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 4px;
    margin-bottom: 12px;
`;

const ItemName = styled.h3`
    font-size: 18px;
    margin-bottom: 8px;
`;

const ItemDescription = styled.p`
    font-size: 14px;
    color: #666;
    margin-bottom: 12px;
`;

const ItemDetails = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: #888;
`;

const ItemList = ({ items }) => {
    if (items.length === 0) {
        return <NoItemsMessage>Brak przedmiotów do wyświetlenia.</NoItemsMessage>;
    }

    return (
        <ItemListContainer>
            {items.map(item => (
                <ItemCard key={item.id}>
                    <ItemImage src={item.imageUrl || 'placeholder-image-url.jpg'} alt={item.name} />
                    <ItemName>{item.name}</ItemName>
                    <ItemDescription>{item.description}</ItemDescription>
                    <ItemDetails>
                        <span>{item.location}</span>
                        <span>{new Date(item.dateAdded).toLocaleDateString()}</span>
                    </ItemDetails>
                </ItemCard>
            ))}
        </ItemListContainer>
    );
};

export default ItemList;
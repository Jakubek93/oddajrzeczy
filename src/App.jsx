import React, { useState } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import GlobalStyle from './GlobalStyle';
import NavigationBar from './components/NavigationBar';
import AddItemModal from './components/AddItemModal';

const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 100%;
    background-color: #f0f2f5;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  width: 100%;
  padding: 2rem;
`;

const App = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [items, setItems] = useState([]);
    const categories = ['Odzież i Akcesoria', 'Meble i Wyposażenie Wnętrz', 'Elektronika'];
    const locations = ['Warszawa', 'Kraków', 'Łódź'];
    const voivodeships = ['Mazowieckie', 'Małopolskie', 'Łódzkie'];

    const handleOpenAddItemModal = () => {
        setIsAddModalOpen(true);
    };

    const handleAddItem = (newItem) => {
        const newItemWithId = {
            ...newItem,
            id: items.length + 1,
            dateAdded: new Date().toISOString(),
            popularity: 0,
            imageUrl: newItem.image ? URL.createObjectURL(newItem.image) : null,
            comments: []
        };
        setItems(prevItems => [...prevItems, newItemWithId]);
        setIsAddModalOpen(false);
    };

    const AppContent = () => {
        const navigate = useNavigate();
        return (
            <>
                <NavigationBar onOpenAddItemModal={handleOpenAddItemModal} />
                <ContentContainer>
                    <Routes>
                        <Route path="/" element={<div>Strona główna</div>} />
                        <Route path="/about" element={<div>O nas</div>} />
                        <Route path="/items" element={<div>Lista przedmiotów</div>} />
                    </Routes>
                </ContentContainer>
                {isAddModalOpen && (
                    <AddItemModal
                        onClose={() => setIsAddModalOpen(false)}
                        onAddItem={handleAddItem}
                        categories={categories}
                        locations={locations}
                        voivodeships={voivodeships}
                    />
                )}
            </>
        );
    };

    return (
        <Router>
            <GlobalStyle />
            <AppContainer>
                <AppContent />
            </AppContainer>
        </Router>
    );
};

export default App;
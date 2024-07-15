import React, { useState } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyle from './GlobalStyle';
import NavigationBar from './components/NavigationBar';
import AddItemModal from './components/AddItemModal';
import ItemList from './components/ItemList';
import SearchBar from './components/SearchBar';
import Filters from './components/Filters';
import SortOptions from './components/SortOptions';
import AboutService from './components/AboutService';

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
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({ category: '', location: '' });
    const [sortOption, setSortOption] = useState('dateAdded');

    const categories = ['Odzież i Akcesoria', 'Meble i Wyposażenie Wnętrz', 'Elektronika'];
    const locations = ['Warszawa', 'Kraków', 'Łódź'];
    const voivodeships = ['Mazowieckie', 'Małopolskie', 'Łódzkie'];

    const handleOpenAddItemModal = () => {
        setIsAddModalOpen(true);
    };

    const closeAddItemModal = () => {
        setIsAddModalOpen(false);
    };

    const handleAddItem = (newItem) => {
        const newItemWithId = {
            ...newItem,
            id: items.length + 1,
            dateAdded: new Date().toISOString(),
            popularity: 0,
            imageUrl: newItem.image ? URL.createObjectURL(newItem.image) : null,
        };
        setItems(prevItems => [...prevItems, newItemWithId]);
        setIsAddModalOpen(false);
    };

    const handleSearch = (query) => setSearchQuery(query);
    const handleFilterChange = (newFilters) => setFilters(newFilters);
    const handleSortChange = (option) => setSortOption(option);

    const filteredItems = items
        .filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (filters.category ? item.category === filters.category : true) &&
            (filters.location ? item.location === filters.location : true)
        )
        .sort((a, b) => {
            if (sortOption === 'dateAdded') return new Date(b.dateAdded) - new Date(a.dateAdded);
            if (sortOption === 'popularity') return b.popularity - a.popularity;
            return 0;
        });

    return (
        <Router>
            <GlobalStyle />
            <AppContainer>
                <NavigationBar
                    onOpenAddItemModal={handleOpenAddItemModal}
                    onCloseAddItemModal={closeAddItemModal}
                />
                <ContentContainer>
                    <Routes>
                        <Route path="/" element={<div>Strona główna</div>} />
                        <Route path="/about" element={<AboutService />} />
                        <Route path="/items" element={
                            <>
                                <SearchBar onSearch={handleSearch} />
                                <SortOptions onSortChange={handleSortChange} />
                                <Filters onFilterChange={handleFilterChange} categories={categories} locations={locations} voivodeships={voivodeships} />
                                <ItemList items={filteredItems} />
                            </>
                        } />
                    </Routes>
                </ContentContainer>
                {isAddModalOpen && (
                    <AddItemModal
                        onClose={closeAddItemModal}
                        onAddItem={handleAddItem}
                        categories={categories}
                        locations={locations}
                        voivodeships={voivodeships}
                    />
                )}
            </AppContainer>
        </Router>
    );
};

export default App;
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalStyle from "./GlobalStyle";
import NavigationBar from "./components/NavigationBar";
import AddItemModal from "./components/AddItemModal";
import ItemList from "./components/ItemList";
import SearchBar from "./components/SearchBar";
import Filters from "./components/Filters";
import SortOptions from "./components/SortOptions";
import AboutService from "./components/AboutService";
import HomePage from "./components/HomePage";
import { supabase } from "./supabase";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  background-color: white;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  width: 100%;
  padding: 2rem;
  margin-top: 60px;
`;

const App = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    location: "",
    voivodeship: "",
  });
  const [sortOption, setSortOption] = useState("created_at");

  const categories = [
    'Odzież i Akcesoria',
    'Meble i Wyposażenie Wnętrz',
    'Elektronika',
    'Książki i Multimedia',
    'Sport i Rekreacja',
    'Zabawki i Artykuły dla Dzieci',
    'Narzędzia i Majsterkowanie',
    'Ogród i Rośliny',
    'Motoryzacja',
    'Sztuka i Kolekcje',
    'Zdrowie i Uroda',
    'Biżuteria i Zegarki',
    'Instrumenty Muzyczne',
    'Artykuły Biurowe',
    'Zwierzęta'
  ];

  const locations = [
    'Białystok', 'Bydgoszcz', 'Częstochowa', 'Gdańsk', 'Gdynia',
    'Gliwice', 'Katowice', 'Kielce', 'Kraków', 'Lublin',
    'Łódź', 'Poznań', 'Radom', 'Rzeszów', 'Sosnowiec',
    'Szczecin', 'Toruń', 'Warszawa', 'Wrocław', 'Zabrze'
  ];

  const voivodeships = [
    'Dolnośląskie', 'Kujawsko-pomorskie', 'Lubelskie', 'Lubuskie', 'Łódzkie',
    'Małopolskie', 'Mazowieckie', 'Opolskie', 'Podkarpackie', 'Podlaskie',
    'Pomorskie', 'Śląskie', 'Świętokrzyskie', 'Warmińsko-mazurskie', 'Wielkopolskie', 'Zachodniopomorskie'
  ];

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from("items")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching items:", error);
    } else {
      setItems(data);
    }
  };

  const handleOpenAddItemModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddItemModal = () => {
    setIsAddModalOpen(false);
  };

  const handleAddItem = async (newItem) => {
    const { data, error } = await supabase
      .from("items")
      .insert([
        {
          name: newItem.name,
          category: newItem.category,
          description: newItem.description,
          location: newItem.location,
          phone_number: newItem.phoneNumber,
          voivodeship: newItem.voivodeship,
          image_url: newItem.imageUrl,
        },
      ])
      .select();

    if (error) {
      console.error("Error adding item:", error);
    } else {
      console.log("New item added:", data);
      setItems((prevItems) => [data[0], ...prevItems]);
      setIsAddModalOpen(false);
    }
  };
  const handleSearch = (query) => setSearchQuery(query);
  const handleFilterChange = (newFilters) => setFilters(newFilters);
  const handleSortChange = (option) => setSortOption(option);

  const filteredItems = items
    .filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (filters.category ? item.category === filters.category : true) &&
        (filters.location ? item.location === filters.location : true) &&
        (filters.voivodeship ? item.voivodeship === filters.voivodeship : true),
    )
    .sort((a, b) => {
      if (sortOption === "created_at")
        return new Date(b.created_at) - new Date(a.created_at);
      if (sortOption === "popularity") return b.popularity - a.popularity;
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
        <Routes>
          <Route
            path="/"
            element={<HomePage onOpenAddItemModal={handleOpenAddItemModal} />}
          />
          <Route
            path="/about"
            element={
              <ContentContainer>
                <AboutService />
              </ContentContainer>
            }
          />
          <Route
            path="/items"
            element={
              <ContentContainer>
                <SearchBar onSearch={handleSearch} />
                <SortOptions onSortChange={handleSortChange} />
                <Filters
                  onFilterChange={handleFilterChange}
                  categories={categories}
                  locations={locations}
                  voivodeships={voivodeships}
                />
                {console.log("Filtered items:", filteredItems)}
                <ItemList items={filteredItems} />
              </ContentContainer>
            }
          />
        </Routes>
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

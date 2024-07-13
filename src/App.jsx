import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/NavigationBar.jsx';
// ... inne importy

const App = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const handleOpenAddItemModal = () => {
        setIsAddModalOpen(true);
    };

    return (
        <Router>
            <Header onOpenAddItemModal={handleOpenAddItemModal} />
        </Router>
    );
};

export default App;
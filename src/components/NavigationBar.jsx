import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Header = styled.nav`
    background-color: #1877f2;
    color: white;
    padding: 1rem 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
`;

const NavContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
`;

const Logo = styled.h1`
    font-size: 24px;
    margin: 0;
    font-weight: bold;
`;

const NavMenu = styled.div`
    display: flex;
    gap: 1rem;
`;

const NavLink = styled.button`
    background: none;
    border: none;
    color: white;
    text-decoration: none;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
`;

const NavigationBar = ({ onOpenAddItemModal, onCloseAddItemModal }) => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        onCloseAddItemModal();
        navigate(path);
    };

    return (
        <Header>
            <NavContainer>
                <Logo>Oddaj rzeczy</Logo>
                <NavMenu>
                    <NavLink onClick={() => handleNavigation('/')}>Strona główna</NavLink>
                    <NavLink onClick={() => handleNavigation('/about')}>O nas</NavLink>
                    <NavLink onClick={() => handleNavigation('/items')}>Lista przedmiotów</NavLink>
                    <NavLink onClick={onOpenAddItemModal}>Dodaj przedmiot</NavLink>
                </NavMenu>
            </NavContainer>
        </Header>
    );
};

export default NavigationBar;
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, /*Link*/ } from "react-router-dom";
import PropTypes from 'prop-types';
import {
  Header,
  NavContainer,
  Logo,
  NavMenu,
  NavLink,
  MenuButton,
  Overlay,
}  from "./NavigationBarStyle";



const NavigationBar = ({ onOpenAddItemModal, onCloseAddItemModal }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "visible";
    return () => {
      document.body.style.overflow = "visible";
    };
  }, [isMenuOpen]);

  const handleNavigation = useCallback(
    (path) => {
      onCloseAddItemModal();
      navigate(path);
      setIsMenuOpen(false);
    },
    [navigate, onCloseAddItemModal],
  );

  const handleAddItem = useCallback(() => {
    onOpenAddItemModal();
    setIsMenuOpen(false);
  }, [onOpenAddItemModal]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  NavigationBar.propTypes = {
    onOpenAddItemModal: PropTypes.func.isRequired,
    onCloseAddItemModal: PropTypes.func.isRequired,
  };


  return (
    <>
      <Header $isScrolled={isScrolled}>
        <NavContainer>
          <MenuButton onClick={toggleMenu} aria-label="Menu">
            {isMenuOpen ? "✕" : "☰"}
          </MenuButton>
          <Logo $isScrolled={isScrolled}>Oddaj rzeczy</Logo>
          <NavMenu $isOpen={isMenuOpen}>
            <NavLink onClick={() => handleNavigation("/")}>
              Strona główna
            </NavLink>
            <NavLink onClick={() => handleNavigation("/about")}>O nas</NavLink>
            <NavLink onClick={() => handleNavigation("/items")}>
              Lista przedmiotów
            </NavLink>
            <NavLink onClick={handleAddItem}>Dodaj przedmiot</NavLink>
          </NavMenu>
        </NavContainer>
      </Header>
      <Overlay $isOpen={isMenuOpen} onClick={toggleMenu} />
    </>
  );
};

export default NavigationBar;

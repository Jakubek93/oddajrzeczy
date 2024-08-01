import styled from "styled-components";

export const Header = styled.nav`
  background-color: ${({ $isScrolled }) =>
  $isScrolled ? "#1565C0" : "#1877f2"};
  color: white;
  padding: 0.5rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: all 0.3s ease-in-out;
`;

export const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

export const Logo = styled.h1`
  font-size: ${({ $isScrolled }) => ($isScrolled ? "20px" : "24px")};
  margin: 0;
  font-weight: bold;
  transition: all 0.3s ease-in-out;

  @media (max-width: 768px) {
    font-size: 20px;
    margin-left: auto;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  gap: 1rem;
  transition: all 0.3s ease-in-out;

  @media (max-width: 768px) {
    flex-direction: column;
    position: fixed;
    top: 0;
    left: ${({ $isOpen }) => ($isOpen ? "0" : "-100%")};
    width: 70%;
    max-width: 209px;
    height: 100vh;
    background-color: #1877f2;
    padding: 4rem 2rem 2rem;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  }
`;

export const NavLink = styled.button`
  background: none;
  border: none;
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  @media (max-width: 768px) {
    padding: 1rem;
    width: 100%;
    text-align: left;
    font-size: 18px;
  }
`;

export const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  @media (max-width: 768px) {
    display: block;
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
  }
`;

export const Overlay = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  transition: opacity 0.3s ease-in-out;

  @media (max-width: 768px) {
    display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
    opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  }
`;


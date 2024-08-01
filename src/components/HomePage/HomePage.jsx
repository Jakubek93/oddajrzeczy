import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import {
  FullScreenContainer,
  HeroSection,
  BackgroundShape,
  Content,
  Title,
  Subtitle,
  CTAButton,
  StatsContainer,
  Stat,
  StatNumber,
  StatLabel,
} from "./HomePageStyle.jsx"


const HomePage = ({ onOpenAddItemModal }) => {
  const navigate = useNavigate();

  HomePage.propTypes = {
    onOpenAddItemModal: PropTypes.func.isRequired,
  };

  const handleStartGiving = () => {
    onOpenAddItemModal();
    navigate('/items');
  };

  const handleFindItems = () => {
    navigate("/items");
  };

  return (
    <FullScreenContainer>
      <HeroSection>
        <BackgroundShape />
        <BackgroundShape
          style={{
            right: "-150px",
            left: "auto",
            top: "50%",
            animationDelay: "-7s",
          }}
        />
        <Content>
          <Title>Podziel się dobrem, oddaj niepotrzebne rzeczy</Title>
          <Subtitle>
            Twoje niepotrzebne przedmioty mogą zmienić czyjeś życie. Dołącz do
            naszej społeczności dzielenia się i wzajemnej pomocy.
          </Subtitle>
          <div>
            <CTAButton onClick={handleStartGiving}>Oddaj rzeczy</CTAButton>
            <CTAButton onClick={handleFindItems}>
              Znajdź potrzebne przedmioty
            </CTAButton>
          </div>
          <StatsContainer>
            <Stat>
              <StatNumber>10,000+</StatNumber>
              <StatLabel>Oddanych przedmiotów</StatLabel>
            </Stat>
            <Stat>
              <StatNumber>5,000+</StatNumber>
              <StatLabel>Zadowolonych użytkowników</StatLabel>
            </Stat>
            <Stat>
              <StatNumber>100+</StatNumber>
              <StatLabel>Miast w Polsce</StatLabel>
            </Stat>
          </StatsContainer>
        </Content>
      </HeroSection>
    </FullScreenContainer>
  );
};

export default HomePage;

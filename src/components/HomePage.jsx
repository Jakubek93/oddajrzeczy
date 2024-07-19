import React from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const FullScreenContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1001;
  overflow: hidden;
`;

const HeroSection = styled.section`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  color: white;
  padding: 2rem;
  position: relative;
`;

const BackgroundShape = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  top: -150px;
  left: -150px;
  animation: ${floatAnimation} 15s infinite ease-in-out;
`;

const Content = styled.div`
  text-align: center;
  max-width: 800px;
  z-index: 1;
  animation: ${fadeIn} 1s ease-out;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const CTAButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  background-color: #fff;
  color: #6e8efb;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0 1rem;

  &:hover {
    background-color: #f0f0f0;
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 3rem;
`;

const Stat = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
`;

const StatLabel = styled.div`
  font-size: 1rem;
  opacity: 0.8;
`;

const HomePage = ({ onOpenAddItemModal }) => {
  const navigate = useNavigate();

  const handleStartGiving = () => {
    onOpenAddItemModal();
    navigate('/add-item');
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

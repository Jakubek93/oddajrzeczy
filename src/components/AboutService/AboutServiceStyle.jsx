import styled from "styled-components";

export const CenteringContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem;
  min-height: 100vh;
  background-color: #f0f2f5;
`;

export const AboutContainer = styled.article`
  max-width: 1000px;
  width: 100%;
  padding: 3rem;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  margin-top: 80px;
`;

export const Title = styled.h1`
  color: #1877f2;
  text-align: center;
  margin-bottom: 3rem;
  font-size: 3.5rem;
  font-weight: bold;
`;

export const Section = styled.section`
  margin-bottom: 3rem;
`;

export const Paragraph = styled.p`
  line-height: 1.8;
  color: #333;
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
`;

export const Highlight = styled.span`
  background-color: #e7f3ff;
  color: #1877f2;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-weight: bold;
`;

export const FunFact = styled.aside`
  background-color: #fff3cd;
  color: #856404;
  padding: 1.5rem;
  border-radius: 10px;
  margin-top: 2rem;
  font-style: italic;
  font-size: 1.1rem;
  border-left: 5px solid #ffeeba;
`;
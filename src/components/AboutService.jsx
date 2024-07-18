import React from "react";
import styled from "styled-components";

const CenteringContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem;
  min-height: 100vh;
  background-color: #f0f2f5;
`;

const AboutContainer = styled.div`
  max-width: 1000px;
  width: 100%;
  padding: 3rem;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  margin-top: 80px;
`;

const Title = styled.h1`
  color: #1877f2;
  text-align: center;
  margin-bottom: 3rem;
  font-size: 3.5rem;
  font-weight: bold;
`;

const Section = styled.section`
  margin-bottom: 3rem;
`;

const Paragraph = styled.p`
  line-height: 1.8;
  color: #333;
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
`;

const Highlight = styled.span`
  background-color: #e7f3ff;
  color: #1877f2;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-weight: bold;
`;

const FunFact = styled.div`
  background-color: #fff3cd;
  color: #856404;
  padding: 1.5rem;
  border-radius: 10px;
  margin-top: 2rem;
  font-style: italic;
  font-size: 1.1rem;
  border-left: 5px solid #ffeeba;
`;

const AboutService = () => {
  return (
    <CenteringContainer>
      <AboutContainer>
        <Title>O serwisie</Title>

        <Section>
          <Paragraph>
            Witaj w naszym wyjątkowym miejscu w sieci! Ten serwis został
            stworzony z myślą o
            <Highlight>
              {" "}
              dzieleniu się z życzliwością niepotrzebnymi rzeczami z innymi
              ludźmi
            </Highlight>
            . Bo wiecie co? Czasem to, co dla nas jest już zbędne, dla kogoś
            innego może okazać się prawdziwym skarbem!
          </Paragraph>
        </Section>

        <Section>
          <Paragraph>
            Moja aplikacja to owoc ciężkiej pracy i... ostatniego egzaminu z
            CodersLab! Tak, dobrze słyszycie - nauka i praktyka w jednym. Twórcą
            tego projektu jest
            <Highlight> Jakub Nowak</Highlight>, który dzielnie walczył z kodem,
            mając u boku niezawodnego wujka Google. Bo kto z nas nie lubi czasem
            "wygooglować" rozwiązania, prawda?
          </Paragraph>
        </Section>

        <Section>
          <Paragraph>
            Mój serwis kieruje się prostymi, ale jakże ważnymi zasadami:
            <Highlight>
              {" "}
              dobrymi intencjami i chęcią wsparcia drugiej osoby
            </Highlight>
            . Bo czy jest coś piękniejszego niż uśmiech na twarzy kogoś, komu
            właśnie pomogliśmy?
          </Paragraph>
        </Section>

        <FunFact>
          Ciekawostka: Podczas tworzenia tej aplikacji wypito hektolitry kawy,
          zjedzone zostały kilogramy pizzy, a wujek Google został odwiedzony tak
          często, że chyba powinnienem go zaprosić na świąteczny obiad!
        </FunFact>
      </AboutContainer>
    </CenteringContainer>
  );
};

export default AboutService;

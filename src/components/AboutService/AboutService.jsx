import React from "react";
import {
  CenteringContainer,
  AboutContainer,
  Title,
  Section,
  Paragraph,
  Highlight,
  FunFact,
} from "./AboutServiceStyle";

const AboutService = () => {
  return (
    <CenteringContainer>
      <AboutContainer>
        <Title>O serwisie</Title>

        <Section aria-labelledby="section1">
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

        <Section aria-labelledby="section2">
          <Paragraph>
            Moja aplikacja to owoc ciężkiej pracy i... ostatniego egzaminu z
            CodersLab! Tak, dobrze słyszycie - nauka i praktyka w jednym. Twórcą
            tego projektu jest
            <Highlight> Jakub Nowak</Highlight>, który dzielnie walczył z kodem,
            mając u boku niezawodnego wujka Google. Bo kto z nas nie lubi czasem
            {" \"wygooglować\" "} rozwiązania, prawda?
          </Paragraph>
        </Section>

        <Section aria-labelledby="section3">
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
          często, że chyba powinnem go zaprosić na świąteczny obiad!
        </FunFact>
      </AboutContainer>
    </CenteringContainer>
  );
};

export default AboutService;
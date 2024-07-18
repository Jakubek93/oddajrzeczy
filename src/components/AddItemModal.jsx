import React, { useState } from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 800px;
  display: flex;
  gap: 20px;
`;

const FormSection = styled.div`
  flex: 1;
`;

const PreviewSection = styled.div`
  flex: 1;
  border-left: 1px solid #ddd;
  padding-left: 20px;
`;

const ModalTitle = styled.h2`
  margin-top: 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

const Textarea = styled.textarea`
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

const Select = styled.select`
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

const Button = styled.button`
  padding: 10px;
  border-radius: 4px;
  border: none;
  background-color: #4caf50;
  color: white;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #45a049;
  }
`;

const PreviewCard = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 15px;
`;

const PreviewTitle = styled.h3`
  margin: 0 0 15px 0;
  font-size: 1.2em;
  color: #333333;
`;

const PreviewInfo = styled.p`
  margin: 5px 0;
  font-size: 14px;
  color: #666666;
`;

const PreviewDescription = styled.p`
  margin: 15px 0;
  font-size: 14px;
  line-height: 1.4;
  color: #444444;
`;

const AddItemModal = ({
  onClose,
  onAddItem,
  categories,
  locations,
  voivodeships,
}) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [voivodeship, setVoivodeship] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({
      name,
      category,
      description,
      location,
      phoneNumber,
      voivodeship,
      imageUrl,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageFile(file);
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <FormSection>
          <ModalTitle>Dodaj nowy przedmiot</ModalTitle>
          <Form onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Nazwa przedmiotu"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Wybierz kategorię</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </Select>
            <Textarea
              placeholder="Opis przedmiotu"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <Select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            >
              <option value="">Wybierz lokalizację</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </Select>
            <Input
              type="text"
              placeholder="Numer telefonu"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <Select
              value={voivodeship}
              onChange={(e) => setVoivodeship(e.target.value)}
              required
            >
              <option value="">Wybierz województwo</option>
              {voivodeships.map((voiv) => (
                <option key={voiv} value={voiv}>
                  {voiv}
                </option>
              ))}
            </Select>
            <Input type="file" accept="image/*" onChange={handleImageChange} />
            <Button type="submit">Dodaj przedmiot</Button>
          </Form>
          <Button onClick={onClose}>Zamknij</Button>
        </FormSection>
        <PreviewSection>
          <ModalTitle>Podgląd przedmiotu</ModalTitle>
          <PreviewCard>
            {imageUrl && <PreviewImage src={imageUrl} alt={name} />}
            <PreviewTitle>{name || "Nazwa przedmiotu"}</PreviewTitle>
            <PreviewInfo>Kategoria: {category || "Nie wybrano"}</PreviewInfo>
            <PreviewInfo>Lokalizacja: {location || "Nie wybrano"}</PreviewInfo>
            <PreviewInfo>
              Województwo: {voivodeship || "Nie wybrano"}
            </PreviewInfo>
            {phoneNumber && <PreviewInfo>Telefon: {phoneNumber}</PreviewInfo>}
            <PreviewDescription>
              {description || "Brak opisu"}
            </PreviewDescription>
          </PreviewCard>
        </PreviewSection>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AddItemModal;

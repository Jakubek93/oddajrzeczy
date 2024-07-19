import React, { useState } from "react";
import styled from "styled-components";

const FormSection = styled.div`
  flex: 1;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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

const AddItemForm = ({ onAddItem, categories, locations, voivodeships }) => {
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
  );
};

export default AddItemForm;
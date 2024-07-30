import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import PropTypes from 'prop-types';

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
    color: #1a1a1a;
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

const CloseButton = styled(Button)`
  background-color: #ff0000;
  color: white;

  &:hover {
    background-color: #cc0000;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;



const AddItemSchema = z.object({
  name: z.string().min(1, "Nazwa przedmiotu jest wymagana"),
  category: z.string().min(1, "Kategoria jest wymagana"),
  description: z.string().min(10, "Opis musi mieć co najmniej 10 znaków"),
  location: z.string().min(1, "Lokalizacja jest wymagana"),
  phoneNumber: z.string().regex(/^\d{9}$/, "Numer telefonu musi mieć 9 cyfr"),
  voivodeship: z.string().min(1, "Województwo jest wymagane"),
  imageFile: z.instanceof(File).optional(),
});


const AddItemModal = ({
                        onClose,
                        onAddItem,
                        categories,
                        locations,
                        voivodeships,
                      }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(AddItemSchema),
  });

  AddItemModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    onAddItem: PropTypes.func.isRequired,
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    locations: PropTypes.arrayOf(PropTypes.string).isRequired,
    voivodeships: PropTypes.arrayOf(PropTypes.string).isRequired,
  };


  const [imageUrl, setImageUrl] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data) => {
    onAddItem({...data, imageUrl});
  };

  const name = watch("name");
  const category = watch("category");
  const description = watch("description");
  const location = watch("location");
  const phoneNumber = watch("phoneNumber");
  const voivodeship = watch("voivodeship");

  return (
    <ModalOverlay>
      <ModalContent>
        <FormSection>
          <ModalTitle>Dodaj nowy przedmiot</ModalTitle>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
              type="text"
              placeholder="Nazwa przedmiotu"
              {...register("name")}
            />
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}

            <Select {...register("category")}>
              <option value="">Wybierz kategorię</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </Select>
            {errors.category && (
              <ErrorMessage>{errors.category.message}</ErrorMessage>
            )}

            <Textarea
              placeholder="Opis przedmiotu"
              {...register("description")}
            />
            {errors.description && (
              <ErrorMessage>{errors.description.message}</ErrorMessage>
            )}

            <Select {...register("location")}>
              <option value="">Wybierz lokalizację</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </Select>
            {errors.location && (
              <ErrorMessage>{errors.location.message}</ErrorMessage>
            )}

            <Input
              type="text"
              placeholder="Numer telefonu"
              {...register("phoneNumber")}
            />
            {errors.phoneNumber && (
              <ErrorMessage>{errors.phoneNumber.message}</ErrorMessage>
            )}

            <Select {...register("voivodeship")}>
              <option value="">Wybierz województwo</option>
              {voivodeships.map((voiv) => (
                <option key={voiv} value={voiv}>
                  {voiv}
                </option>
              ))}
            </Select>
            {errors.voivodeship && (
              <ErrorMessage>{errors.voivodeship.message}</ErrorMessage>
            )}

            <Input type="file" accept="image/*" onChange={handleImageChange} />

            <Button type="submit">Dodaj przedmiot</Button>
          </Form>
          <CloseButton onClick={onClose}>Zamknij</CloseButton>
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



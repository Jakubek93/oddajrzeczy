import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import PropTypes from 'prop-types';
import {
  ModalOverlay,
  ModalContent,
  FormSection,
  PreviewSection,
  ModalTitle,
  Form,
  Input,
  Textarea,
  Select,
  Button,
  PreviewCard,
  PreviewImage,
  PreviewTitle,
  PreviewInfo,
  PreviewDescription,
  CloseButton,
  ErrorMessage,
} from "./AddItemModalStyle.jsx"




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



import React, { useState } from "react";
import styled from "styled-components";
import { supabase } from "../supabase.js";
import { z } from "zod";

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

const CloseButton = styled(Button)`
    background-color: #ff0000;
    color: white;

    &:hover {
        background-color: #cc0000;
    }
`;

const ErrorMessage = styled.div`
    color: red;
    font-size: 0.8em;
    margin-top: 5px;
    margin-bottom: 10px;
`;


const AddItemModal = ({
                        onClose,
                        onAddItem,
                        categories,
                        locations,
                        voivodeships,
                      }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    location: "",
    phoneNumber: "",
    voivodeship: "",
    imageFile: null,
    imageUrl: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (data) => {
    let errors = {};
    if (!data.name.trim()) errors.name = "Nazwa przedmiotu jest wymagana";
    if (!data.category) errors.category = "Kategoria jest wymagana";
    if (!data.description.trim()) errors.description = "Opis jest wymagany";
    if (!data.location) errors.location = "Lokalizacja jest wymagana";
    if (data.phoneNumber && !/^[0-9]{9}$/.test(data.phoneNumber)) {
      errors.phoneNumber = "Nieprawidłowy numer telefonu (9 cyfr)";
    }
    if (!data.voivodeship) errors.voivodeship = "Województwo jest wymagane";
    if (!data.imageFile) errors.image = "Zdjęcie jest wymagane";
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, image: "Plik jest za duży. Maksymalny rozmiar to 5MB." }));
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          imageFile: file,
          imageUrl: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        let imageUrl = null;
        if (formData.imageFile) {
          const fileName = `${Date.now()}_${formData.imageFile.name}`;
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('item-images')
            .upload(fileName, formData.imageFile);

          if (uploadError) throw uploadError;

          const { data: { publicUrl }, error: urlError } = supabase.storage
            .from('item-images')
            .getPublicUrl(fileName);

          if (urlError) throw urlError;

          imageUrl = publicUrl;
        }

        const { data, error } = await supabase
          .from("items")
          .insert([
            {
              name: formData.name,
              category: formData.category,
              description: formData.description,
              location: formData.location,
              phone_number: formData.phoneNumber,
              voivodeship: formData.voivodeship,
              image_url: imageUrl,
            },
          ])
          .select();

        if (error) throw error;

        onAddItem(data[0]);
        onClose();
      } catch (error) {
        console.error("Error adding item:", error);
        setErrors(prev => ({ ...prev, submit: `Błąd podczas dodawania przedmiotu: ${error.message}` }));
      }
    }
    setIsSubmitting(false);
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <FormSection>
          <ModalTitle>Dodaj nowy przedmiot</ModalTitle>
          <Form onSubmit={handleSubmit}>
            <Input
              type="text"
              name="name"
              placeholder="Nazwa przedmiotu"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}

            <Select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Wybierz kategorię</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </Select>
            {errors.category && <ErrorMessage>{errors.category}</ErrorMessage>}

            <Textarea
              name="description"
              placeholder="Opis przedmiotu"
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && <ErrorMessage>{errors.description}</ErrorMessage>}

            <Select
              name="location"
              value={formData.location}
              onChange={handleChange}
            >
              <option value="">Wybierz lokalizację</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </Select>
            {errors.location && <ErrorMessage>{errors.location}</ErrorMessage>}

            <Input
              type="text"
              name="phoneNumber"
              placeholder="Numer telefonu"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            {errors.phoneNumber && <ErrorMessage>{errors.phoneNumber}</ErrorMessage>}

            <Select
              name="voivodeship"
              value={formData.voivodeship}
              onChange={handleChange}
            >
              <option value="">Wybierz województwo</option>
              {voivodeships.map((voiv) => (
                <option key={voiv} value={voiv}>
                  {voiv}
                </option>
              ))}
            </Select>
            {errors.voivodeship && <ErrorMessage>{errors.voivodeship}</ErrorMessage>}

            <Input type="file" accept="image/*" onChange={handleImageChange} />
            {errors.image && <ErrorMessage>{errors.image}</ErrorMessage>}
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Dodawanie..." : "Dodaj przedmiot"}
            </Button>
            {errors.submit && <ErrorMessage>{errors.submit}</ErrorMessage>}
          </Form>
          <CloseButton onClick={onClose}>Zamknij</CloseButton>
        </FormSection>
        <PreviewSection>
          <ModalTitle>Podgląd przedmiotu</ModalTitle>
          <PreviewCard>
            {formData.imageUrl && <PreviewImage src={formData.imageUrl} alt={formData.name} />}
            <PreviewTitle>{formData.name || "Nazwa przedmiotu"}</PreviewTitle>
            <PreviewInfo>Kategoria: {formData.category || "Nie wybrano"}</PreviewInfo>
            <PreviewInfo>Lokalizacja: {formData.location || "Nie wybrano"}</PreviewInfo>
            <PreviewInfo>Województwo: {formData.voivodeship || "Nie wybrano"}</PreviewInfo>
            {formData.phoneNumber && <PreviewInfo>Telefon: {formData.phoneNumber}</PreviewInfo>}
            <PreviewDescription>{formData.description || "Brak opisu"}</PreviewDescription>
          </PreviewCard>
        </PreviewSection>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AddItemModal;
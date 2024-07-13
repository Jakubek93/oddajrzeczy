import React, { useState } from 'react';
import styled from 'styled-components';

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
`;

const Button = styled.button`
    padding: 8px 16px;
    font-size: 14px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
`;

const CancelButton = styled(Button)`
    background-color: #e0e0e0;
    color: #333;

    &:hover {
        background-color: #d0d0d0;
    }
`;

const SubmitButton = styled(Button)`
    background-color: #1877f2;
    color: white;

    &:hover {
        background-color: #166fe5;
    }
`;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ModalContent = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 90%;
    max-width: 500px;
`;

const ModalTitle = styled.h2`
    color: black;
    margin-bottom: 20px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    margin-bottom: 10px;
    padding: 8px;
`;

const TextArea = styled.textarea`
    margin-bottom: 10px;
    padding: 8px;
    height: 100px;
`;

const Select = styled.select`
    margin-bottom: 10px;
    padding: 8px;
`;

const AddItemModal = ({ onClose, onAddItem, categories, locations, voivodeships }) => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [voivodeship, setVoivodeship] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddItem({ name, category, description, location, phoneNumber, voivodeship, image });
        onClose();
    };

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
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
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </Select>
                    <TextArea
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
                            <option key={loc} value={loc}>{loc}</option>
                        ))}
                    </Select>
                    <Input
                        type="tel"
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
                        {voivodeships.map((voi) => (
                            <option key={voi} value={voi}>{voi}</option>
                        ))}
                    </Select>
                    <Input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                    <ButtonContainer>
                        <CancelButton type="button" onClick={onClose}>Anuluj</CancelButton>
                        <SubmitButton type="submit">Dodaj przedmiot</SubmitButton>
                    </ButtonContainer>
                </Form>
            </ModalContent>
        </ModalOverlay>
    );
};

export default AddItemModal;
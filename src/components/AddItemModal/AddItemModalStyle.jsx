import styled from "styled-components";

export const ModalOverlay = styled.div`
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

export const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 800px;
  display: flex;
  gap: 20px;
`;

export const FormSection = styled.div`
  flex: 1;
`;

export const PreviewSection = styled.div`
  flex: 1;
  border-left: 1px solid #ddd;
  padding-left: 20px;
`;

export const ModalTitle = styled.h2`
  margin-top: 0;
    color: #1a1a1a;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

export const Textarea = styled.textarea`
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

export const Select = styled.select`
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

export const Button = styled.button`
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

export const PreviewCard = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const PreviewImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 15px;
`;

export const PreviewTitle = styled.h3`
  margin: 0 0 15px 0;
  font-size: 1.2em;
  color: #333333;
`;

export const PreviewInfo = styled.p`
  margin: 5px 0;
  font-size: 14px;
  color: #666666;
`;

export const PreviewDescription = styled.p`
  margin: 15px 0;
  font-size: 14px;
  line-height: 1.4;
  color: #444444;
`;

export const CloseButton = styled(Button)`
  background-color: #ff0000;
  color: white;

  &:hover {
    background-color: #cc0000;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;


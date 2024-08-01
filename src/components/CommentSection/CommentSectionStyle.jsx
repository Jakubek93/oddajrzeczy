import styled from "styled-components";

export const CommentContainer = styled.div`
    margin-top: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

export const CommentHeader = styled.h3`
    color: #333;
    margin-bottom: 15px;
`;

export const CommentForm = styled.form`
    display: flex;
    margin-bottom: 20px;
    
    @media (max-width: 898px) {
        flex-direction: column;
    }
`;

export const CommentInput = styled.input`
    flex-grow: 1;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 20px;
    font-size: 14px;
    transition: border-color 0.3s;

    &:focus {
        outline: none;
        border-color: #4caf50;
    }

    @media (max-width: 898px) {
        width: 100%;
        margin-bottom: 0.625rem;
    }
`;

export const SubmitButton = styled.button`
    padding: 10px 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 20px;
    margin-left: 10px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #45a049;
    }
    @media (max-width: 898px) {
        margin-top: 0.625rem;
        margin-left: 0;
        width: 100%;
    }
`;

export const CommentList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

export const CommentItem = styled.li`
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

export const CommentContent = styled.p`
  margin: 0;
  color: #333;
`;

export const CommentDate = styled.span`
  font-size: 0.8em;
  color: #888;
  display: block;
  margin-top: 5px;
`;



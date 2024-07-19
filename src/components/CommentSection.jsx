import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { supabase } from "../supabase";

const CommentContainer = styled.div`
    margin-top: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const CommentHeader = styled.h3`
    color: #333;
    margin-bottom: 15px;
`;

const CommentForm = styled.form`
    display: flex;
    margin-bottom: 20px;
    
    @media (max-width: 898px) {
        flex-direction: column;
    }
`;

const CommentInput = styled.input`
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

const SubmitButton = styled.button`
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

const CommentList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const CommentItem = styled.li`
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

const CommentContent = styled.p`
  margin: 0;
  color: #333;
`;

const CommentDate = styled.span`
  font-size: 0.8em;
  color: #888;
  display: block;
  margin-top: 5px;
`;

const CommentSection = ({ itemId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    fetchComments();
  }, [itemId]);

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("item_id", itemId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching comments:", error);
    } else {
      setComments(data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const { data, error } = await supabase
      .from("comments")
      .insert([{ item_id: itemId, content: newComment }])
      .select();

    if (error) {
      console.error("Error adding comment:", error);
    } else {
      setComments([data[0], ...comments]);
      setNewComment("");
    }
  };

  return (
    <CommentContainer>
      <CommentHeader>Komentarze ({comments.length})</CommentHeader>
      <CommentForm onSubmit={handleSubmit}>
        <CommentInput
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Dodaj komentarz..."
        />
        <SubmitButton type="submit">Dodaj</SubmitButton>
      </CommentForm>
      <CommentList>
        {comments.map((comment) => (
          <CommentItem key={comment.id}>
            <CommentContent>{comment.content}</CommentContent>
            <CommentDate>{new Date(comment.created_at).toLocaleString()}</CommentDate>
          </CommentItem>
        ))}
      </CommentList>
    </CommentContainer>
  );
};

export default CommentSection;
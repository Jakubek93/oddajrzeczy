import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { supabase } from "../supabase"; //

const CommentContainer = styled.div`
  margin-top: 20px;
  border-top: 1px solid #e0e0e0;
  padding-top: 20px;
`;

const CommentForm = styled.form`
  display: flex;
  margin-bottom: 20px;
`;

const CommentInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 10px;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const CommentList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const CommentItem = styled.li`
  background-color: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
  color: black;
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
      <h4>Komentarze</h4>
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
          <CommentItem key={comment.id}>{comment.content}</CommentItem>
        ))}
      </CommentList>
    </CommentContainer>
  );
};

export default CommentSection;

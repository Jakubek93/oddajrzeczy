import React, { useState, useEffect } from "react";
import { supabase } from "../../supabase.js";
import PropTypes from 'prop-types';
import  {
  CommentContainer,
  CommentHeader,
  CommentForm,
  CommentInput,
  SubmitButton,
  CommentList,
  CommentItem,
  CommentContent,
  CommentDate
} from "./CommentSectionStyle.jsx"

const CommentSection = ({ itemId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    fetchComments();
  }, [itemId]);

  CommentSection.propTypes = {
    itemId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  };

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
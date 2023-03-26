import React from 'react';
import { useNavigate } from 'react-router';
import './Post.styles.scss';

const Post = ({ post }) => {
  const { author, content } = post;
  const navigate = useNavigate();
  const handlePostEdit = () => {
    navigate('/edit', { state: { post: post } });
  };

  return (
    <div className="post">
      <div dangerouslySetInnerHTML={{ __html: content }} className="post__content"></div>
      <div className="post__info">
        <p className="post__author">Автор: {author}</p>
        <button onClick={handlePostEdit} title="Редактировать" className="post__edit-btn" />
      </div>
    </div>
  );
};

export default Post;

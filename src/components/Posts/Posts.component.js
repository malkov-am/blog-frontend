import React from 'react';
import { Link } from 'react-router-dom';
import Post from '../Post/Post.component';
import './Posts.styles.scss';

const Posts = ({ isLoggedIn }) => {
  return (
    <div className="posts">
      {isLoggedIn && (
        <Link to="/edit" className="posts__btn">
          Новый пост
        </Link>
      )}
      <Post />
      <Post />
    </div>
  );
};

export default Posts;

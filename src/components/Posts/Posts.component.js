import React from 'react';
import { Link } from 'react-router-dom';
import Post from '../Post/Post.component';
import './Posts.styles.scss';

const Posts = ({ posts, isLoggedIn }) => {
  return (
    <div className="posts">
      {isLoggedIn && (
        <Link to="/edit" className="posts__btn">
          Новый пост
        </Link>
      )}
      {posts.map((post) => {
        return <Post key={post.id} post={post}/>
      })}
    </div>
  );
};

export default Posts;

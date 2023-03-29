import React from 'react';
import { Link } from 'react-router-dom';
import Post from '../Post/Post.component';
import Spinner from '../Spinner/Spinner';
import './Posts.styles.scss';

const Posts = ({ posts, isLoggedIn, onDeletePost, isLoadingPosts }) => {
  return (
    <div className="posts">
      {isLoggedIn ? (
        <Link to="/edit" className="posts__btn">
          Новый пост
        </Link>
      ) : (
        <h3 className="posts__notification">Станьте автором, пройдя регистрацию</h3>
      )}
      {isLoadingPosts && <Spinner />}
      {posts.map((post) => {
        return <Post key={post._id} post={post} onDeletePost={onDeletePost} />;
      })}
    </div>
  );
};

export default Posts;

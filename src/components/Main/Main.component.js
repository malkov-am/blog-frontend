import React from 'react';
import './Main.styles.scss';
import { Link } from 'react-router-dom';
import Posts from '../Posts/Posts.component';

const Main = ({ isLoggedIn, posts, deferredPosts, onDeletePost, isLoadingPosts }) => {
  return (
    <div className="main">
      {isLoggedIn ? (
        <div className="main__btns">
          <Link to="/edit" className="main__btn">
            Новый пост
          </Link>
          <Link to="/deferred" className="main__btn">
            Ждут публикации ({deferredPosts.length})
          </Link>
        </div>
      ) : (
        <h3 className="main__notification">Станьте автором, пройдя регистрацию</h3>
      )}
      <Posts posts={posts} onDeletePost={onDeletePost} isLoadingPosts={isLoadingPosts} />
    </div>
  );
};

export default Main;

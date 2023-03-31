import React from 'react';
import Post from '../Post/Post.component';
import Spinner from '../Spinner/Spinner';
import './Posts.styles.scss';

const Posts = ({ posts, onDeletePost, isLoadingPosts }) => {
  return (
    <div className="posts">
      {isLoadingPosts && <Spinner />}
      {posts.length > 0 ? (
        posts.map((post) => {
          return <Post key={post._id} post={post} onDeletePost={onDeletePost} />;
        })
      ) : (
        <h3 className="main__notification">Постов пока нет</h3>
      )}
    </div>
  );
};

export default Posts;

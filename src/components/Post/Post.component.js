import React from 'react';
import './Post.styles.scss';

const Post = ({ post }) => {
  return (
    <div className="post">
      <div className="post__content">
        <h1>Block Styling</h1>
        <p>
          Within <code>Editor</code>, some block types are given default CSS styles to limit the
          amount of basic configuration required to get engineers up and running with custom
          editors.
        </p>
        <p>
          By defining a <code>blockStyleFn</code> prop function for an <code>Editor</code>, it is
          possible to specify classes that should be applied to blocks at render time.
        </p>
      </div>
      <div className="post__info">
        <p className="post__author">Автор: Андрей</p>
        <button title="Редактировать" className="post__edit-btn" />
      </div>
    </div>
  );
};

export default Post;

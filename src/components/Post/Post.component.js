import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Button, { BUTTON_TYPE_CLASSES } from '../Button/Button.component';
import './Post.styles.scss';

const Post = ({ post, onDeletePost, isPreview }) => {
  const currentUser = useContext(CurrentUserContext);
  const navigate = useNavigate();
  if (!post) return null;
  const { owner, content, filename, filelink } = post;
  const { name, _id: ownerId } = owner;

  const postEdit = () => {
    navigate('/edit', { state: { post: post } });
  };

  const postDelete = () => {
    onDeletePost(post);
  };

  return (
    <div className="post">
      <div className="post__content">
        <div dangerouslySetInnerHTML={{ __html: content }} />
        {filename && (
          <>
            <p className="post__attachment">Прикрепленный файл: </p>
            <a href={filelink} target="_blank" rel="noreferrer">
              {filename}
            </a>
          </>
        )}
      </div>
      <div className="post__info">
        <p className="post__author">Автор: {name}</p>
        {!isPreview && currentUser._id === ownerId && (
          <div className="post__buttons">
            <Button buttonType={BUTTON_TYPE_CLASSES.pen} onClick={postEdit} title="Редактировать" />
            <Button
              buttonType={BUTTON_TYPE_CLASSES.trash}
              onClick={postDelete}
              title="Удалить"
            />{' '}
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;

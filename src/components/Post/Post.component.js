import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Button, { BUTTON_TYPE_CLASSES } from '../Button/Button.component';
import './Post.styles.scss';

const Post = ({ post, onDeletePost }) => {
  const { owner, content, _id: postId } = post;
  const { name, _id: ownerId } = owner;

  const currentUser = useContext(CurrentUserContext);

  const navigate = useNavigate();

  const postEdit = () => {
    navigate('/edit', { state: { post: post } });
  };

  const postDelete = () => {
    onDeletePost(postId);
  };

  return (
    <div className="post">
      <div dangerouslySetInnerHTML={{ __html: content }} className="post__content"></div>
      <div className="post__info">
        <p className="post__author">Автор: {name}</p>
        {currentUser._id === ownerId && (
          <div>
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

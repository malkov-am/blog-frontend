import React from 'react';
import { setEntityData } from '../TextEditor.component';

const Link = ({ contentState, entityKey, children }) => {
  const { url } = contentState.getEntity(entityKey).getData();

  const editLink = () => {
    // const updatedUrl = prompt('URL:', url);
    // updatedUrl && setEntityData(entityKey, { url: updatedUrl });
  };

  return (
    <a href={url} onClick={editLink}>
      {children}
    </a>
  );
};

export default Link;

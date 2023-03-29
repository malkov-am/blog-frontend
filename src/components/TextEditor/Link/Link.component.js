import React from 'react';

const Link = ({ contentState, entityKey, children }) => {
  const { url } = contentState.getEntity(entityKey).getData();

  return (
    <a href={url} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
};

export default Link;

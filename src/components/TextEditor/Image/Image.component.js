import React from 'react';

const Image = ({ contentState, entityKey }) => {
  const { url } = contentState.getEntity(entityKey).getData();

  return (
    <img src={url} />
  );
};

export default Image;

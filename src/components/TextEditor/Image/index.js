import Image from './Image.component';

function findImageEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return entityKey !== null && contentState.getEntity(entityKey).getType() === 'image';
  }, callback);
}

const ImageDecorator = {
  strategy: findImageEntities,
  component: Image,
};

export default ImageDecorator;

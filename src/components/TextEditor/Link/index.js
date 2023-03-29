import Link from './Link.component';

function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return entityKey !== null && contentState.getEntity(entityKey).getType() === 'link';
  }, callback);
}

const LinkDecorator = {
  strategy: findLinkEntities,
  component: Link,
};

export default LinkDecorator;

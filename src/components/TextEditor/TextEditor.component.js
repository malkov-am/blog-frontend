import { Editor, EditorState, RichUtils, AtomicBlockUtils, CompositeDecorator } from 'draft-js';
import { useContext, useRef, useState } from 'react';
import BlockStyleControls from './BlockStyleControls/BlockStyleControls.component';
import InlineStyleControls from './InlineStyleControls/InlineStyleControls.component';
import { htmlToState, stateToHtml } from './convert';
import './TextEditor.styles.scss';
import { useLocation, useNavigate } from 'react-router';
import Button, { BUTTON_TYPE_CLASSES } from '../Button/Button.component';
import LinkDecorator from './Link';
import ImageDecorator from './Image';
import StyleButton from './StyleButton/StyleButton.component';
import Post from '../Post/Post.component';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const TextEditor = ({ onSubmit, isLoading }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const post = location.state?.post;
  const postId = post?._id;
  const decorator = new CompositeDecorator([LinkDecorator, ImageDecorator]);

  const [file, setFile] = useState('');
  const [editorState, setEditorState] = useState(() =>
    post
      ? EditorState.createWithContent(htmlToState(post.content), decorator)
      : EditorState.createEmpty(decorator),
  );
  const [postPreview, setPostPreview] = useState(null);

  const currentUser = useContext(CurrentUserContext);

  const editor = useRef();
  const fileInputRef = useRef('');

  const focusOnInput = () => {
    editor.current.focus();
  };

  const toggleBlockType = (blockStyle) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockStyle));
  };

  const toggleInlineStyle = (inlineStyle) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  const submit = () => {
    const content = stateToHtml(editorState.getCurrentContent());
    onSubmit(content, postId, file);
  };

  const addEntity = (entityType, data, mutability) => {
    setEditorState((currentState) => {
      const contentState = currentState.getCurrentContent();
      const contentStateWithEntity = contentState.createEntity(entityType, mutability, data);
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      const newState = EditorState.set(currentState, { currentContent: contentStateWithEntity });
      return RichUtils.toggleLink(newState, newState.getSelection(), entityKey);
    });
  };

  const addAtomicBlock = (entityType, data, mutability) => {
    setEditorState((currentState) => {
      const contentState = currentState.getCurrentContent();
      const contentStateWithEntity = contentState.createEntity(entityType, mutability, data);
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      const newState = EditorState.set( editorState, { currentContent: contentStateWithEntity });
      return AtomicBlockUtils.insertAtomicBlock(newState, entityKey, ' ');
  });
};

  const addLink = (url) => {
    return addEntity('link', { url }, 'MUTABLE');
  };

  const handlerAddLink = () => {
    const url = prompt('URL');
    url && addLink(url);
  };

  const addImage = (url) => {
    return addAtomicBlock('image', { url }, 'IMMUTABLE');
  };

  const handlerAddImage = () => {
    const url = prompt('URL');
    url && addImage(url);
  };

  const handleAttachFile = (evt) => {
    setFile(evt.target.files[0]);
  }

  const handleOpenPreview = () => {
    const content = stateToHtml(editorState.getCurrentContent());
     setPostPreview({ owner: currentUser, content, _id: null });
  }

  return (
    <>
    <Post post={postPreview} isPreview={true} />
    <div className="editor">
      <div className="editor__controls">
        <div className="editor__controls-block-wrapper">
          <BlockStyleControls onToggle={toggleBlockType} />
          <Button
            buttonType={BUTTON_TYPE_CLASSES.close}
            label="Закрыть"
            onClick={() => navigate(-1)}
          />
        </div>
        <InlineStyleControls onToggle={toggleInlineStyle} />
        <div className="editor__controls-wrapper">
          <StyleButton onToggle={handlerAddLink} style="link" label="Вставить ссылку" />
          <StyleButton onToggle={handlerAddImage} style="image" label="Вставить изображение" />
        </div>
      </div>
      <div className="editor__text-area" onClick={focusOnInput}>
        <Editor
          editorState={editorState}
          onChange={(editorState) => setEditorState(editorState)}
          ref={editor}
        />
      </div>
      <input
        className="editor__file-input"
        type="file"
        ref={fileInputRef}
        onChange={handleAttachFile}
      ></input>
      <div className="editor__submit-btns">
        <Button buttonType={BUTTON_TYPE_CLASSES.sizeL} onClick={submit} isLoading={isLoading}>
          Опубликовать
        </Button>
        <Button buttonType={BUTTON_TYPE_CLASSES.sizeLTransparent} onClick={handleOpenPreview}>
          Предпросмотр
        </Button>
      </div>
    </div>
    </>
  );
};

export default TextEditor;

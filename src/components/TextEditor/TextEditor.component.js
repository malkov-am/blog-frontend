import { Editor, EditorState, RichUtils } from 'draft-js';
import { useRef, useState } from 'react';
import BlockStyleControls from './BlockStyleControls/BlockStyleControls.component';
import InlineStyleControls from './InlineStyleControls/InlineStyleControls.component';
import { htmlToState, stateToHtml } from './convert';
import './TextEditor.styles.scss';
import { useLocation, useNavigate } from 'react-router';
import Button, { BUTTON_TYPE_CLASSES } from '../Button/Button.component';
import { CompositeDecorator } from 'draft-js';
import LinkDecorator from './Link';
import StyleButton from './StyleButton/StyleButton.component';

const TextEditor = ({ onSubmit, isLoading }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const post = location.state?.post;
  const postId = post?._id;
  const decorator = new CompositeDecorator([LinkDecorator]);

  const [editorState, setEditorState] = useState(() =>
    post
      ? EditorState.createWithContent(htmlToState(post.content), decorator)
      : EditorState.createEmpty(decorator),
  );

  const editor = useRef();

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
    onSubmit(content, postId);
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

  const addLink = (url) => {
    return addEntity('link', { url }, 'MUTABLE');
  };

  const handlerAddLink = () => {
    const url = prompt('URL');
    url && addLink(url);
  };

  return (
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
        <StyleButton onToggle={handlerAddLink} style="link" label="Вставить ссылку" />
      </div>
      <div className="editor__text-area" onClick={focusOnInput}>
        <Editor
          editorState={editorState}
          onChange={(editorState) => setEditorState(editorState)}
          ref={editor}
        />
      </div>
      <Button buttonType={BUTTON_TYPE_CLASSES.sizeL} onClick={submit} isLoading={isLoading}>
        Опубликовать
      </Button>
    </div>
  );
};

export default TextEditor;

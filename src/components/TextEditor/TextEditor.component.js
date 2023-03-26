import { Editor, EditorState, RichUtils } from 'draft-js';
import { useRef, useState } from 'react';
import BlockStyleControls from './BlockStyleControls/BlockStyleControls.component';
import InlineStyleControls from './InlineStyleControls/InlineStyleControls.component';
import { htmlToState, stateToHtml } from './convert';
import './TextEditor.styles.scss';
import { useLocation } from 'react-router';
import Button, { BUTTON_TYPE_CLASSES } from '../Button/Button.component';

const TextEditor = ({ onPublish }) => {
  const location = useLocation();
  const post = location.state?.post;

  const [editorState, setEditorState] = useState(() =>
    post ? EditorState.createWithContent(htmlToState(post.content)) : EditorState.createEmpty(),
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

  const publish = () => {
    const htmlMarkup = stateToHtml(editorState.getCurrentContent());
    onPublish(post, htmlMarkup);
  };

  return (
    <div className="editor">
      <div className="editor__controls">
        <BlockStyleControls onToggle={toggleBlockType} />
        <InlineStyleControls onToggle={toggleInlineStyle} />
      </div>
      <div className="editor__text-area" onClick={focusOnInput}>
        <Editor
          editorState={editorState}
          onChange={(editorState) => setEditorState(editorState)}
          ref={editor}
        />
      </div>
      <Button buttonType={BUTTON_TYPE_CLASSES.sizeL} onClick={publish}>
        Опубликовать
      </Button>
    </div>
  );
};

export default TextEditor;

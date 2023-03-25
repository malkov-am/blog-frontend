import { Editor, EditorState, RichUtils } from 'draft-js';
import { useState } from 'react';
import BlockStyleControls from '../BlockStyleControls/BlockStyleControls.component';
import InlineStyleControls from '../InlineStyleControls/InlineStyleControls.component';
import { htmlToState, stateToHtml } from './convert';
import './TextEditor.styles.scss';

const TextEditor = ({ content }) => {
  const [editorState, setEditorState] = useState(() =>
    content ? EditorState.createWithContent(htmlToState(content)) : EditorState.createEmpty(),
  );

  const toggleBlockType = (blockStyle) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockStyle));
  };

  const toggleInlineStyle = (inlineStyle) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  const submitText = () => {
    const htmlMarkup = stateToHtml(editorState.getCurrentContent());
    console.log(htmlMarkup);
  };

  return (
    <div className="editor">
      <div className="editor__controls">
        <BlockStyleControls onToggle={toggleBlockType} />
        <InlineStyleControls onToggle={toggleInlineStyle} />
      </div>
      <div className="editor__text-area">
        <Editor editorState={editorState} onChange={(editorState) => setEditorState(editorState)} />
      </div>
      <button onClick={submitText}>Сохранить</button>
    </div>
  );
};

export default TextEditor;

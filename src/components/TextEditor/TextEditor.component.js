import { Editor, EditorState, RichUtils } from 'draft-js';
import { useState } from 'react';
import BlockStyleControls from '../BlockStyleControls/BlockStyleControls.component';
import InlineStyleControls from '../InlineStyleControls/InlineStyleControls.component';
import './TextEditor.styles.scss';

const TextEditor = () => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  const toggleBlockType = (blockStyle) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockStyle));
  };

  const toggleInlineStyle = (inlineStyle) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
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
    </div>
  );
};

export default TextEditor;

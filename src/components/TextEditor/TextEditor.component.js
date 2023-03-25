import { Editor, EditorState, RichUtils } from 'draft-js';
import { useRef, useState } from 'react';
import BlockStyleControls from './BlockStyleControls/BlockStyleControls.component';
import InlineStyleControls from './InlineStyleControls/InlineStyleControls.component';
import { htmlToState, stateToHtml } from './convert';
import './TextEditor.styles.scss';

const TextEditor = ({ content }) => {
  const [editorState, setEditorState] = useState(() =>
    content ? EditorState.createWithContent(htmlToState(content)) : EditorState.createEmpty(),
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

  const submitText = () => {
    const htmlMarkup = stateToHtml(editorState.getCurrentContent());
    console.log(JSON.stringify({ author: 'Андрей', content: htmlMarkup }));
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
      <button className="editor__btn-save" onClick={submitText}>
        Сохранить
      </button>
    </div>
  );
};

export default TextEditor;

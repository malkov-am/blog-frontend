import { EditorState } from 'draft-js';
import { useMemo, useState } from 'react';

const useEditor = () => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  return useMemo(
    () => ({
      editorState,
      onChange: setEditorState,
    }),
    [editorState],
  );
};

export default useEditor;

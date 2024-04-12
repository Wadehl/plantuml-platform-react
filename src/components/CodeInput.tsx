import { useRef } from 'react';

import { useCodingStore, useConfigStore } from '../store';

// monaco
import Editor, { Monaco } from '@monaco-editor/react';
import { editor } from 'monaco-editor';
import { PUmlExtension } from '@sinm/monaco-plantuml';

// encoding
import encoder from 'plantuml-encoder';

import { debounce } from 'lodash-es';

const initMonacoTheme = (monaco: Monaco) => {
  monaco.editor.defineTheme('plantuml-theme', {
    base: 'vs',
    inherit: true,
    rules: [
      { token: 'annotation', foreground: '#8b59c4', fontStyle: 'bold' },
      { token: 'keyword', foreground: '#2980b9', fontStyle: 'bold' },
      { token: 'identifier', foreground: '#16a085' },
      { token: 'number', foreground: '#e67e22' },
      { token: 'string', foreground: '#e74c3c' },
      { token: 'string.quote', foreground: '#e74c3c', fontStyle: 'bold' },
      { token: 'string.escape', foreground: '#e74c3c', fontStyle: 'bold' },
      { token: 'string.invalid', foreground: '#e74c3c', fontStyle: 'bold' },
      { token: 'number.float', foreground: '#e67e22', fontStyle: 'bold' },
      { token: 'number.hex', foreground: '#e67e22', fontStyle: 'bold' },
      { token: 'brackets', foreground: '#9b59b6', fontStyle: 'bold' },
      { token: 'delimiter', foreground: '#9b59b6', fontStyle: 'bold' },
      { token: 'preprocessor', foreground: '#8e44ad', fontStyle: 'bold' }
    ],
    colors: {}
  });

  monaco.editor.defineTheme('plantuml-theme-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'annotation', foreground: '#8b59c4', fontStyle: 'bold' },
      { token: 'keyword', foreground: '#2980b9', fontStyle: 'bold' },
      { token: 'identifier', foreground: '#16a085' },
      { token: 'number', foreground: '#e67e22' },
      { token: 'string', foreground: '#e74c3c' },
      { token: 'string.quote', foreground: '#e74c3c', fontStyle: 'bold' },
      { token: 'string.escape', foreground: '#e74c3c', fontStyle: 'bold' },
      { token: 'string.invalid', foreground: '#e74c3c', fontStyle: 'bold' },
      { token: 'number.float', foreground: '#e67e22', fontStyle: 'bold' },
      { token: 'number.hex', foreground: '#e67e22', fontStyle: 'bold' },
      { token: 'brackets', foreground: '#9b59b6', fontStyle: 'bold' },
      { token: 'delimiter', foreground: '#9b59b6', fontStyle: 'bold' },
      { token: 'preprocessor', foreground: '#8e44ad', fontStyle: 'bold' }
    ],
    colors: {}
  });
};

function CodeInput() {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const handleBeforeMount = (monaco: Monaco) => {
    initMonacoTheme(monaco);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleEditorDidMount = (
    editor: editor.IStandaloneCodeEditor,
    _monaco: Monaco
  ) => {
    editorRef.current = editor;
    const extension = new PUmlExtension();

    const disposer = extension.active(editor);

    return () => {
      disposer.dispose();
    };
  };

  const handleEncode = (newVal: string | undefined) => {
    setCodeString(newVal || '');
    const encodedString = encoder.encode(newVal as string);
    setEncodedString(encodedString);
    updateTask(activeIndex, newVal || '');
  };

  const debouncedHandleEncode = debounce(handleEncode, 300);

  const {
    codeString,
    setCodeString,
    setEncodedString,
    updateTask,
    activeIndex
  } = useCodingStore();

  return (
    <Editor
      className="w-full h-full"
      defaultLanguage="plantuml"
      theme={
        useConfigStore().config.theme === 'dark'
          ? 'plantuml-theme-dark'
          : 'plantuml-theme'
      }
      value={codeString}
      beforeMount={handleBeforeMount}
      onMount={handleEditorDidMount}
      onChange={debouncedHandleEncode}
    />
  );
}

export default CodeInput;

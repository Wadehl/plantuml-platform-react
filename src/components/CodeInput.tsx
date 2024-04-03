import { useRef } from "react";

import { useCodingStore } from "../store";

// monaco
import Editor from "@monaco-editor/react";

import { PUmlExtension } from "@sinm/monaco-plantuml";

// encoding
import * as encoder from "plantuml-encoder";

import { debounce } from "lodash-es";

function CodeInput() {
  const editorRef = useRef<HTMLTextAreaElement>(null);

  const handleEditorDisMount = (editor, monaco) => {
    editorRef.current = editor;
    const extension = new PUmlExtension();

    const disposer = extension.active(editor);

    return () => {
      disposer.dispose();
    };
  };

  const handleEncode = (newVal: string | undefined) => {
    setCodeString(newVal || "");
    const encodedString = encoder.encode(newVal);
    setEncodedString(encodedString);
  };

  const debouncedHandleEncode = debounce(handleEncode, 300);

  const { codeString, setCodeString, setEncodedString } = useCodingStore();

  return (
    <Editor
      className="w-full h-full"
      defaultLanguage="plantuml"
      defaultValue={codeString}
      onMount={handleEditorDisMount}
      onChange={debouncedHandleEncode}
    />
  );
}

export default CodeInput;

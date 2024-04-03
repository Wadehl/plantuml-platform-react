import {useState} from "react";
import {createStore} from "hox";

export const [useCodingStore, CodingStoreProvider] = createStore(() => {
  const [codeString, setCodeString] = useState("");
  const [encodedString, setEncodedString] = useState("");
  
  return {
    codeString,
    setCodeString,
    encodedString,
    setEncodedString,
  };
});

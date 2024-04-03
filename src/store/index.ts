import {useState} from "react";
import {createStore} from "hox";

export const [useCodingStore, CodingStoreProvider] = createStore(() => {
  const [codeString, setCodeString] = useState("@startuml\n" +
    "Bob -> Alice : hello\n" +
    "@enduml");
  const [encodedString, setEncodedString] = useState("SoWkIImgAStDuNBAJrBGjLDmpCbCJbMmKiX8pSd9vt98pKi1IW80");
  
  return {
    codeString,
    setCodeString,
    encodedString,
    setEncodedString,
  };
});

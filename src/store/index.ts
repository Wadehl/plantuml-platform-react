import {useState} from "react";
import {createGlobalStore} from "hox";

export const [useCodingStore, getCodingStore] = createGlobalStore(() => {
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

export type Direction = "horizontal" | "vertical" | "horizontal-reverse" | "vertical-reverse" | undefined;

export const [useConfigStore, getConfigStore] = createGlobalStore(() => {
  const [config, setConfig] = useState<{
    theme: "light" | "dark";
    direction: Direction;
    titleRotate: number;
    colorStart: string;
    colorEnd: string;
    isObjectFit: boolean;
    baseWidth: number;
    baseHeight: number;
  }>({
    theme: "light",
    direction: "horizontal",
    titleRotate: 315,
    colorStart: '#E84418',
    colorEnd: '#F4A81B',
    isObjectFit: true,
    baseWidth: 800,
    baseHeight: 800,
  });
  
  return {
    config,
    setConfig,
  };
});

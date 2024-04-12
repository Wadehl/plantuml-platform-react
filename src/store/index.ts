import {useState} from "react";
import {createGlobalStore} from "hox";

import {useDebounce} from "react-use";
import {Message} from "@arco-design/web-react";

const saveToLocalStorage = (key: string, value: object | string | number) => {
  localStorage
    .setItem(key, JSON.stringify(value));
}

const getFromLocalStorage = (key: string) => {
  return JSON.parse(localStorage
    .getItem(key) || "null");
}

export const [useCodingStore, getCodingStore] = createGlobalStore(() => {
  const [codeString, setCodeString] = useState("@startuml\n" +
    "Bob -> Alice : hello\n" +
    "Alice --> Bob : hi 🤗\n" +
    "@enduml");
  const [encodedString, setEncodedString] = useState("SoWkIImgAStDuNBAJrBGjLDmpCbCJbMmKiX8pSd9vuBmT87Y86cWQAR2X_bBfdCvfEQb03K10000");
  
  useDebounce(() => {
      saveToLocalStorage('coding', {
        codeString,
        encodedString
      });
    },
    300,
    [codeString, encodedString]);
  
  const $load = () => {
    const data = getFromLocalStorage('coding');
    if (data) {
      setCodeString(data.codeString || "@startuml\n" +
        "Bob -> Alice : hello\n" +
        "Alice --> Bob : hi 🤗\n" +
        "@enduml");
      setEncodedString(data.encodedString || "SoWkIImgAStDuNBAJrBGjLDmpCbCJbMmKiX8pSd9vuBmT87Y86cWQAR2X_bBfdCvfEQb03K10000");
    }
  }
  
  return {
    codeString,
    setCodeString,
    encodedString,
    setEncodedString,
    $load,
  };
});

export type Direction = "horizontal" | "vertical" | "horizontal-reverse" | "vertical-reverse" | undefined;

export const [useConfigStore, getConfigStore] = createGlobalStore(() => {
  const baseConfig:
    {
      theme: "light" | "dark";
      direction: Direction;
      titleRotate: number;
      colorStart: string;
      colorEnd: string;
      isObjectFit: boolean;
      baseWidth: number;
      baseHeight: number;
      prefixURL: string;
    }
    = {
    theme: "light",
    direction: "horizontal",
    titleRotate: 315,
    colorStart: '#E84418',
    colorEnd: '#F4A81B',
    isObjectFit: true,
    baseWidth: 800,
    baseHeight: 800,
    prefixURL: 'https://www.plantuml.com/plantuml/'
  }
  
  const [config, setConfig] = useState(baseConfig);
  
  const [show, toggle] = useState(false);
  
  useDebounce(() => {
      saveToLocalStorage('config', config);
    },
    300,
    [config]);
  
  const $load = () => {
    const data = getFromLocalStorage('config');
    if (data) {
      setConfig(data);
    }
  }
  
  const $reset = () => {
    setConfig(baseConfig);
  }
  
  const $export = () => {
    /*
      以JSON文件格式下载配置文件
     */
    
    const blob = new Blob([JSON.stringify(config)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'plantuml-config.json';
    a.click();
    URL.revokeObjectURL(url);
  }
  
  const $import = ()=> {
    /*
       从JSON文件导入配置文件
     */
    
    const input = document.createElement('input');
    input.type = 'file';
    input.click();
    
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        const file = files[0];
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result;
          if (result) {
            const data = JSON.parse(result as string);
            setConfig(data);
            Message.success('导入成功');
          }
        }
        reader.onerror = () => {
          Message.error('导入失败');
        }
        reader.readAsText(file);
      }
    }
  }
  
  
  
  return {
    config,
    show,
    toggle,
    setConfig,
    $load,
    $reset,
    $export,
    $import,
  };
});

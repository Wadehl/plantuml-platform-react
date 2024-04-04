import {useCodingStore, useConfigStore} from "../store";

import {useMemo, useState} from "react";

import {Image, Button, Dropdown, Menu, Space, Message} from '@arco-design/web-react';

type exportType = "SVG" | "PNG";

function ImageOutput() {
  const {encodedString} = useCodingStore();
  const {config: configs} = useConfigStore();
  
  const [exportType, setExportType] = useState<exportType>("SVG");
  
  const svgUrl = useMemo(() => {
    return `https://www.plantuml.com/plantuml/${configs.theme === 'dark' ? 'd' : ''}${exportType.toLowerCase()}/${encodedString}`;
  }, [encodedString, configs, exportType]);
  
  const downloadPng = async () => {
    try {
      const res = await fetch(svgUrl);
      const svgString = await res.text();
      // 将svg转换为canvas
      const canvas = document.createElement('canvas');
      const ctx: any = canvas.getContext('2d');
      const img = new Image();
      img.src = `data:image/svg+xml;base64,${btoa(svgString)}`;
      
      img.onload = function () {
        const expectWidth = configs.baseWidth;
        const expectHeight = configs.baseHeight;
        
        if (expectHeight && !configs.isObjectFit) {
          canvas.width = expectWidth;
          canvas.height = expectHeight;
          ctx.drawImage(img, 0, 0, expectWidth, expectHeight);
          const pngData = canvas.toDataURL('image/png');
          downloadFile(pngData, 'plantuml.png');
          return;
        }
        const rate = img.width / expectWidth;
        if (rate < 1) {
          canvas.width = expectWidth;
          canvas.height = img.height / rate;
        } else {
          canvas.width = img.width;
          canvas.height = img.height;
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        const pngData = canvas.toDataURL('image/png');
        downloadFile(pngData, 'plantuml.png');
      };
    } catch (e: unknown) {
      console.error(e);
      Message.error(`下载失败: ${e}`);
    }
  };
  
  const downloadFile = (pngData: string, filename: string) => {
    const a = document.createElement('a');
    a.href = pngData;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(pngData);
  };
  
  const onClickDisplay = (key: exportType | string) => {
    setExportType(key as exportType);
  }
  
  const onClickExport = (key: exportType | string) => {
  
  }
  
  const displayDropList = (
    <Menu onClickMenuItem={onClickDisplay}>
      <Menu.Item key={'SVG'}>SVG</Menu.Item>
      <Menu.Item key={'PNG'}>PNG</Menu.Item>
    </Menu>
  )
  
  const exportDropList = (
    <Menu onClickMenuItem={onClickExport}>
      <Menu.Item key={'SVG'}>SVG转PNG下载</Menu.Item>
      <Menu.Item key={'PNG'}>原生PNG下载</Menu.Item>
    </Menu>
  )
  
  return (
    <div className="w-full h-full relative p-4 box-border">
      <div className="absolute right-4 top-3 z-100">
        <Space>
          <Dropdown droplist={displayDropList} trigger="hover">
            <Button type="primary">{exportType}</Button>
          </Dropdown>
          <Dropdown droplist={exportDropList} trigger="hover">
            <Button type="primary">下载</Button>
          </Dropdown>
        </Space>
      </div>
      <Image className="top-6" width="100%" src={`${svgUrl}`}/>
    </div>
  );
}

export default ImageOutput;

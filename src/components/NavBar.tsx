import {Switch, Divider, Dropdown, Menu} from "@arco-design/web-react";
// import {Moon, Sun} from "@icon-park/react";
import React, {useEffect, useState} from "react";
import {useConfigStore} from "../store";
import {
  IconFilePdf,
  IconGithub,
  IconLanguage,
  IconSettings,
  IconMoon as Moon,
  IconSun as Sun
} from "@arco-design/web-react/icon";

// components
import SettingPanel from "./SettingPanel";

function GradientTitle({rotate, start, end, children}: {
  rotate: number,
  start: string,
  end: string,
  children: React.ReactNode
}) {
  const gradient = `linear-gradient(${rotate}deg, ${start} 0%, ${end} 100%)`;
  const style = {
    backgroundImage: gradient,
    backgroundClip: 'text',
    color: "#0000",
    whiteSpace: "nowrap",
    transition: `${start} .3s cubic-bezier(.4, 0, .2, 1), ${end} .3s cubic-bezier(.4, 0, .2, 1)`,
  };
  return (
    <span className={"text-1.5rem font-500"} style={style}>{children}</span>
  )
}

function NavBar() {
  const {config, setConfig} = useConfigStore();
  
  const handleChange = (val: boolean) => {
    if (val) {
      setConfig({
        ...config,
        theme: "dark"
      })
    } else {
      setConfig({
        ...config,
        theme: "light"
      })
    }
  }
  
  useEffect(() => {
    if (config.theme === "dark") {
      document.body.setAttribute('arco-theme', 'dark');
    } else {
      document.body.removeAttribute('arco-theme');
    }
  }, [config.theme]);
  
  const handleChangeLanguage = () => {
    // TODO: change language
  };
  
  const [visible, setVisible] = useState(false);
  
  return (
    <div className="flex items-center justify-between container m-auto h-full w-90vw bg-transparent">
      {/*<span className="text-violet-900 font-bold text-1.5rem ">PlantUML Platform React 🤩</span>*/}
      <div className="flex items-center text-1.5rem">
        <GradientTitle rotate={config.titleRotate} start={config.colorStart} end={config.colorEnd}>PlantUML Platform
          React
        </GradientTitle>🤩
      </div>
      <div className="flex items-center justify-end w-fit ms-auto gap-4">
        <IconGithub className={"cursor-pointer text-1.3rem"} style={{color: "var(--color-text-1)"}}
                    onClick={() => {
                      window.open('https://github.com/Wadehl/plantuml-platform-react', '_blank');
                    }}/>
        <IconSettings className={"cursor-pointer text-1.5rem"} style={{color: "var(--color-text-1)"}}
                      onClick={() => {
                        setVisible(true);
                      }}
        />
        <IconFilePdf className={"cursor-pointer text-1.5rem"} style={{color: "var(--color-text-1)"}}
                     onClick={() => {
                       window.open('https://plantuml.com/zh/guide', '_blank');
                     }}
        />
        <Divider type="vertical"/>
        <Dropdown position={"bottom"} droplist={
          <Menu onClickMenuItem={handleChangeLanguage}>
            <Menu.Item key={"zh"}>简体中文</Menu.Item>
            <Menu.Item key={"more"}>...</Menu.Item>
          </Menu>
        }>
          <IconLanguage className={"cursor-pointer text-1.5rem"} style={{color: "var(--color-text-1)"}}/>
        </Dropdown>
        <Switch className="text-gray-900" checkedIcon={<Moon className="text-gray-900"/>}
                uncheckedIcon={<Sun className="text-gray-900"/>} checked={config.theme === 'dark'}
                onChange={handleChange}/>
      </div>
      
      <SettingPanel visible={visible} setVisible={setVisible}/>
    </div>
  )
}

export default NavBar;

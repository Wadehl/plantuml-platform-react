import {Switch, Divider} from "@arco-design/web-react";
import {Moon, Sun, Translate, Github} from "@icon-park/react";
import {useEffect, useMemo} from "react";
import {useConfigStore} from "../store";
import {IconGithub, IconLanguage} from "@arco-design/web-react/icon";

function GradientTitle({rotate, start, end, children}) {
  const gradient = `linear-gradient(${rotate}deg, ${start} 0%, ${end} 100%)`;
  const style = {
    backgroundImage: gradient,
    backgroundClip: 'text',
    color: "#0000",
    whiteSpace: "nowrap",
    transition: `${start} .3s cubic-bezier(.4, 0, .2, 1), ${end} .3s cubic-bezier(.4, 0, .2, 1)`,
  };
  return (
    <span className={"text-1.5rem font-bold"} style={style}>{children}</span>
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
  
  return (
    <div className="flex items-center justify-between container m-auto h-full w-90vw bg-transparent">
      {/*<span className="text-violet-900 font-bold text-1.5rem ">PlantUML Platform React 🤩</span>*/}
      <div className="flex items-center text-1.5rem">
        <GradientTitle rotate={config.titleRotate} start={config.colorStart} end={config.colorEnd}>PlantUML Platform
          React
        </GradientTitle>🤩
      </div>
      <div className="flex items-center justify-end w-fit ms-auto gap-2">
        <IconGithub className={"cursor-pointer text-1.5rem"} style={{color: "var(--color-text-1)"}}
                    onClick={() => {
                      window.open('https://github.com/Wadehl/plantuml-platform-react', '_blank');
                    }}/>
        <Divider type="vertical"/>
        <IconLanguage className={"cursor-pointer text-1.5rem"} style={{color: "var(--color-text-1)"}}/>
        <Switch className="text-gray-900" checkedIcon={<Moon className="text-gray-900"/>}
                uncheckedIcon={<Sun className="text-gray-900"/>} onChange={handleChange}/>
      </div>
    </div>
  )
}

export default NavBar;

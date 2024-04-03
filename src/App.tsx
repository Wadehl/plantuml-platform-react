import "./App.css";

import {useState, useEffect} from "react";

// components
import CodeInput from "./components/CodeInput.tsx";
import ImageOutput from "./components/ImageOutput.tsx";

import {Layout, ResizeBox, Switch} from '@arco-design/web-react';

// icons
import {Moon, Sun} from '@icon-park/react';

const {Header, Sider, Content} = Layout;

const layoutStyle = {
  overflow: 'hidden',
  background: 'var(--color-bg-1)'
};

type Direction = "horizontal" | "vertical" | "horizontal-reverse" | "vertical-reverse" | undefined;

const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");

darkThemeMq.addListener(e => {
  if (e.matches) {
    document.body.setAttribute('arco-theme', 'dark');
  } else {
    document.body.removeAttribute('arco-theme');
  }
});

function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [direction] = useState<Direction>("horizontal");
  
  const handleChange = (val: boolean) => {
    if (val) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }
  
  useEffect(() => {
    if (theme === "dark") {
      document.body.setAttribute('arco-theme', 'dark');
    } else {
      document.body.removeAttribute('arco-theme');
    }
  }, [theme]);
  
  return (
    <Layout style={layoutStyle} className="w-screen h-screen overflow-auto box-border shadow-xl">
      <Header style={{background: "var(--color-bg-1)"}} className="h-5vh w-90vw m-auto">
        <div className="flex items-center justify-between container m-auto h-full">
          <span className="text-violet-900 font-bold text-1.5rem ">PlantUML Platform React 🤩</span>
          <div className="flex items-center justify-end w-fit ms-auto">
            <Switch className="text-gray-900" checkedIcon={<Moon className="text-gray-900"/>}
                    uncheckedIcon={<Sun className="text-gray-900"/>} onChange={handleChange}/>
          </div>
        </div>
      </Header>
      <Layout style={{background: "var(--color-bg-1)"}} className="h-95vh">
        <Sider width="200px">
        
        </Sider>
        <Content className="h-full p-4 box-border">
          <ResizeBox.Split
            panes={[
              <CodeInput/>,
              <ImageOutput/>
            ]}
            direction={direction}
            max={0.8}
            min={0.2}
            className="h-full w-full"
          />
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;

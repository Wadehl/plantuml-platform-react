import "./App.css";
// components
import CodeInput from "./components/CodeInput.tsx";
import ImageOutput from "./components/ImageOutput.tsx";

import {Layout, ResizeBox, Menu, List} from '@arco-design/web-react';

// store
import {useConfigStore} from "./store";
import NavBar from "./components/NavBar.tsx";
import {useState} from "react";

const {Header, Sider, Content} = Layout;

const layoutStyle = {
  overflow: 'hidden',
  background: 'var(--color-bg-1)'
};

const layoutBarStyle = {
  cursor: 'pointer',
  height: '72px',
  width: '32px',
}

const barStyle = {
  width: '4px',
  borderRadius: '2px',
  height: '76px',
  backgroundColor: '#BFBFBF'
}

function App() {
  const {config} = useConfigStore();
  
  const [collapse, setCollapse] = useState(true);
  
  return (
    <Layout style={layoutStyle} className="w-screen h-screen overflow-auto box-border shadow-xl">
      <Header style={{background: 'var(--color-menu-light-bg)', borderColor: "rgba(255, 255, 255, 0.09)"}}
              className="h-5vh w-100vw m-auto border-b border-b-solid">
        <NavBar/>
      </Header>
      <Layout style={{background: "var(--color-bg-1)"}} className="h-95vh">
        {/*<Sider width={collapse ? '0px' : '17.2rem'} className="me-2" style={{*/}
        {/*  transition: 'width 0.3s',*/}
        {/*}}>*/}
        {/*  <Menu className="h-full relative overflow-x-hidden" collapse={collapse}>*/}
        {/*    <div className="box-border overflow-x-hidden overflow-y-auto w-full h-full p-2 flex flex-col items-center gap-.5rem">*/}
        {/*    */}
        {/*    </div>*/}
        {/*  </Menu>*/}
        {/*  <div*/}
        {/*    className="absolute cursor-pointer"*/}
        {/*    style={{top: "50%", right: "-2.5rem", transform: "translateY(-50%)"}}*/}
        {/*    onClick={() => setCollapse(!collapse)}*/}
        {/*  >*/}
        {/*    <div style={layoutBarStyle}>*/}
        {/*      <div style={barStyle}></div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</Sider>*/}
        <Content className="h-full p-4 box-border">
          <ResizeBox.Split
            panes={[
              <CodeInput/>,
              <ImageOutput/>
            ]}
            direction={config.direction}
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

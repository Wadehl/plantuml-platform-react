import {
  Drawer,
  Tabs,
  Form,
  Switch,
  InputNumber,
  ColorPicker,
  Popover,
  Alert,
  Input,
  Button, Space
} from "@arco-design/web-react";

// store
import {useConfigStore} from "../store";

function EmojiSwitch({handleChange, checked = false}: {
  checked?: boolean;
  handleChange: (value: boolean, event: Event) => void;
}) {
  return (
    <Switch
      defaultChecked={checked}
      onChange={handleChange}
      checkedIcon={"🥳"}
      uncheckedIcon={"🤔"}
    />
  )
}


function SettingPanel({visible, setVisible}: {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}) {
  const TabPane = Tabs.TabPane;
  const FormItem = Form.Item;
  const {config, show, toggle, setConfig, $reset, $export, $import} = useConfigStore();
  
  return (
    <Drawer
      visible={visible}
      title="设置"
      width={350}
      onOk={() => {
        $reset();
      }}
      okText={"重置"}
      onCancel={() => {
        setVisible(false);
      }}
      closable={true}
      maskClosable={true}
    >
      <Tabs type={"capsule"} size={"large"} animation={true}>
        <TabPane title={"样式设置🫠"} key={"1"}>
          <div className={"font-bold font-size-4 my-2"}>
            布局设置🎡
          </div>
          <Form labelAlign={"left"} style={{
            width: '100%',
          }} labelCol={{
            span: 7
          }} wrapperCol={{
            span: 17,
          }}>
            <FormItem label={"垂直布局"}>
              <EmojiSwitch checked={config.direction === 'vertical'} handleChange={(value) => {
                setConfig({
                  ...config,
                  direction: value ? "vertical" : "horizontal"
                })
              }}/>
            </FormItem>
            <FormItem label={"全屏显示"}>
              <EmojiSwitch checked={show} handleChange={(value) => {
                toggle(value);
              }}/>
            </FormItem>
          </Form>
          <div className={"font-bold font-size-4 my-2"}>
            标题渐变设置🥸
          </div>
          <Form labelAlign={"left"} style={{
            width: '100%',
          }} labelCol={{
            span: 7
          }} wrapperCol={{
            span: 17,
          }}>
            <FormItem label={"渐变角度"}>
              <InputNumber min={0} max={359} value={config.titleRotate}
                           onChange={(value) => {
                             setConfig({
                               ...config,
                               titleRotate: value
                             });
                           }}/>
            </FormItem>
            <FormItem label={"渐变颜色1"}>
              <ColorPicker showHistory={true} showText={true} value={config.colorStart} onChange={(value) => {
                setConfig({
                  ...config,
                  colorStart: value
                });
              }}/>
            </FormItem>
            <FormItem label={"渐变颜色2"}>
              <ColorPicker showHistory={true} showText={true} value={config.colorEnd} onChange={(value) => {
                setConfig({
                  ...config,
                  colorEnd: value
                });
              }}/>
            </FormItem>
          </Form>
        </TabPane>
        <TabPane title={"下载设置😶‍🌫️"} key={"2"}>
          <Popover content={
            "PlantUML地址，用于图片服务，如：https://www.plantuml.com/plantuml/svg/[图片的hash]"
          } position={"left"}>
            <div className={"font-bold font-size-4 my-2 cursor-help"}>
              PlantUML设置 🤓
            </div>
          </Popover>
          <Form labelAlign={"left"} style={{
            width: '100%',
          }} labelCol={{
            span: 8
          }} wrapperCol={{
            span: 16,
          }}>
            <Alert closable type={"warning"} title={"WARNING⚠️"} showIcon={false}
                   content={"Do not change the default value unless you know what you are doing."}
                   className={"mb-2"}
            />
            <FormItem label={"服务器地址"}>
              <Input value={config.prefixURL} onChange={(value) => {
                setConfig({
                  ...config,
                  prefixURL: value
                });
              }}/>
            </FormItem>
          </Form>
          
          <div className={"font-bold font-size-4 my-2"}>
            SVG 转 PNG 导出设置 😶
          </div>
          <Form labelAlign={"left"} style={{
            width: '100%',
          }} labelCol={{
            span: 8
          }} wrapperCol={{
            span: 16,
          }}>
            <FormItem label={"与原图等比例"}>
              <EmojiSwitch checked={config.isObjectFit} handleChange={(value) => {
                setConfig({
                  ...config,
                  isObjectFit: value
                });
              }}/>
            </FormItem>
            <FormItem label={"基础宽度"}>
              <InputNumber min={0} value={config.baseWidth} onChange={(value) => {
                setConfig({
                  ...config,
                  baseWidth: value
                });
              }}/>
            </FormItem>
            <FormItem label={"基础高度"}>
              <InputNumber disabled={config.isObjectFit} min={0} value={config.baseHeight} onChange={(value) => {
                setConfig({
                  ...config,
                  baseHeight: value
                });
              }}/>
            </FormItem>
          </Form>
        </TabPane>
        <TabPane title={"配置操作😤"} key={"3"}>
          <div className={"font-bold font-size-4 my-2"}>
            导出设置😎
          </div>
          <Space className={"w-full"} direction={"vertical"}>
            <Button type={"primary"} className={"w-full"} onClick={$import}>从本地导入 🌠 </Button>
            <Button type={"secondary"} className={"w-full"} onClick={$export}>导出到本地 💫 </Button>
          </Space>
        </TabPane>
      </Tabs>
    </Drawer>
  )
}

export default SettingPanel;

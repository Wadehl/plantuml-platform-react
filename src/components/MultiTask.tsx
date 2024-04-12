// components

// store
import { useCodingStore } from '../store';
import {
  Button,
  Menu,
  Popconfirm,
  Popover,
  Space
} from '@arco-design/web-react';

function SidebarItem({
  code,
  encoded,
  delIndex,
  active
}: {
  code: string;
  encoded: string;
  delIndex: number;
  active: boolean;
}) {
  const { removeTask, loadTask } = useCodingStore();

  return (
    <div
      className={(active ? 'active' : '') + ' sidebar-item'}
      key={delIndex}
      onClick={() => loadTask(delIndex)}
    >
      <img
        height={'100%'}
        className={'object-scale-down h-full overflow-hidden'}
        src={encoded}
        alt={code}
        width={'100%'}
      />
      <Button type={'text'} className={'position-absolute right-0 top-0 z-999'}>
        <span className="text-lg">📝</span>
      </Button>
      <Popconfirm onOk={() => removeTask(delIndex)} title={'Are U sure?'}>
        <Button
          type={'text'}
          className={'position-absolute right-0 bottom-0 z-999'}
        >
          <span className="text-lg">🗑️</span>
        </Button>
      </Popconfirm>
    </div>
  );
}

function MultiTask() {
  const { taskList, activeIndex, addTask, clearTasks } = useCodingStore();

  return (
    <Popover
      trigger={'contextMenu'}
      position={'right'}
      content={
        <Menu>
          <Menu.Item key={'add'} onClick={() => addTask('')}>
            🤗 添加任务
          </Menu.Item>
          <Menu.Item key={'deleteAll'} onClick={() => clearTasks()}>
            🗑️ 清空任务（除第一项外）
          </Menu.Item>
          <Menu.Item key={'deleteOther'} onClick={() => clearTasks(true)}>
            🗑️ 清空其他任务
          </Menu.Item>
        </Menu>
      }
    >
      <div className={'w-full h-full'}>
        <Space className={'mb-2'}>
          <Button onClick={() => addTask('')}>🤗 添加任务</Button>
        </Space>

        {taskList.map((task, index) => (
          <SidebarItem
            key={index}
            code={task.code}
            encoded={'https://plantuml.com/plantuml/svg/' + task.encoded}
            delIndex={index}
            active={index === activeIndex}
          />
        ))}
      </div>
    </Popover>
  );
}

export default MultiTask;

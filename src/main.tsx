import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// unocss
import 'virtual:uno.css';

// 通用字体
import 'vfonts/Roboto.css';
// 等宽字体
import 'vfonts/FiraCode.css';

// monaco editor
import { loader } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';

// store
import { HoxRoot } from 'hox';

// you can change the source of the monaco files
// loader.config({
//   paths: {
//     vs: "https://cdn.bootcdn.net/ajax/libs/monaco-editor/0.43.0/min/vs",
//   },
// });

loader.config({ monaco });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <HoxRoot>
    <App />
  </HoxRoot>
);

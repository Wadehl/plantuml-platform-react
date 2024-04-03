import {defineConfig} from "vite";
import react from "@vitejs/plugin-react-swc";
import unocss from "@unocss/vite"

import {vitePluginForArco} from '@arco-plugins/vite-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [unocss(), react(), vitePluginForArco({
    style: 'css'
  })],
});

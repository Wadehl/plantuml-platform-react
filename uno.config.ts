// uno.config.ts
import {defineConfig, presetUno} from 'unocss'

export default defineConfig({
    presets: [
        presetUno(),
    ],
    shortcuts: {
        'sidebar-item':
            'w-15rem h-13rem p-2.3rem ms-.6rem rounded shadow-md .drop-shadow box-border overflow-hidden position-relative justify-center items-center text-center transition-all duration-120 ease-in-out',
        active: 'p-1.8rem border-solid'
    },
})

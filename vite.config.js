// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
export default defineConfig({
    plugins: [react()],
    test: {
        environment: "jsdom", // necesario para las pruebas de React
        globals: true, // permite usar describe, it, etc. sin importar Vitest en cada archivo
        setupFiles: "./src/setupTests.js", // Opcional: archivo de configuración de pruebas
        base: "", // opcional: directorio base
    },
})

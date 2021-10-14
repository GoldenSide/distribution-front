
import vue from '@vitejs/plugin-vue'
import viteSvgIcons from 'vite-plugin-svg-icons';
import path from "path";
// https://vitejs.dev/config/
export default {
  plugins: [
    vue(),
    viteSvgIcons({
      // 配置路劲在你的src里的svg存放文件
      iconDirs: [path.resolve(process.cwd(), 'src/icons')],
      symbolId: 'icon-[dir]-[name]',
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/variables.scss";',
      },
    },
  },
  server: {
    host: '0.0.0.0',
  }
}

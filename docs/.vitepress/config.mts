import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'VitePress',
  description: '由 Vite 和 Vue 驱动的静态站点生成器',
  lastUpdated: true,
  themeConfig: {
    logo: '/vitepress-logo-large.webp',
    nav: [
      {
        text: '指南',
        link: 'https://vitejs.cn/vitepress/guide/what-is-vitepress'
      },
      {
        text: '参考',
        link: 'https://vitejs.cn/vitepress/reference/site-config'
      },
      {
        text: 'Vitejs中文网',
        link: 'https://vitejs.cn/'
      }
    ],
    search: { provider: 'local' }
  }
})


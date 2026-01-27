import { defineConfig } from 'vitepress'

// 基础站点配置：增加语言切换（locales）和版本下拉（themeConfig.nav）
export default defineConfig({
  // 多语言配置：会在右上角自动出现语言切换下拉
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN'
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/'
    },
    pt: {
      label: 'Português',
      lang: 'pt-BR',
      link: '/pt/'
    },
    ru: {
      label: 'Русский',
      lang: 'ru-RU',
      link: '/ru/'
    },
    es: {
      label: 'Español',
      lang: 'es-ES',
      link: '/es/'
    },
    ko: {
      label: '한국어',
      lang: 'ko-KR',
      link: '/ko/'
    }
  },

  themeConfig: {
    // 右上角的导航，增加版本号下拉
    nav: [
      {
        text: '1.3.2',
        items: [
          { text: '1.3.2（当前）', link: '/' },
          { text: '1.3.1', link: '/' },
          { text: '1.3.0', link: '/' }
        ]
      }
    ]
  }
})


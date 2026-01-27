import { h, onMounted, nextTick } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    // 可以在这里注册全局组件
  },
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'nav-bar-content-after': () => h(NavBarExtra)
    })
  },
  setup() {
    onMounted(() => {
      nextTick(() => {
        // 确保在 DOM 完全渲染后执行
        injectNavBarComponents()
        
        // 多次尝试确保成功
        const intervals = [100, 300, 500, 1000, 2000, 3000]
        intervals.forEach(delay => {
          setTimeout(() => injectNavBarComponents(), delay)
        })
        
        // 监听 DOM 变化
        if (typeof window !== 'undefined' && document.body) {
          const observer = new MutationObserver(() => {
            setTimeout(() => injectNavBarComponents(), 100)
          })
          observer.observe(document.body, { 
            childList: true, 
            subtree: true,
            attributes: false
          })
        }
      })
    })
  }
} satisfies Theme

// 动态注入导航栏组件
function injectNavBarComponents() {
  if (typeof window === 'undefined') return
  
  // 检查是否已经注入
  if (document.querySelector('.nav-extra-wrapper')) {
    return
  }

  // 精确查找导航栏内容区域
  let navBarContent: Element | null = null
  
  // 方法1: 直接查找 VPNavBarContent（最准确）
  navBarContent = document.querySelector('.VPNavBarContent')
  
  // 方法2: 查找 VPNavBar 然后找其内容区域
  if (!navBarContent) {
    const navBar = document.querySelector('.VPNavBar')
    if (navBar) {
      navBarContent = navBar.querySelector('.VPNavBarContent') || 
                     navBar.querySelector('.content') ||
                     Array.from(navBar.children).find(el => 
                       el.classList.contains('VPNavBarContent') || 
                       el.classList.contains('content')
                     ) as Element || null
      
      if (!navBarContent) {
        navBarContent = navBar
      }
    }
  }
  
  // 方法3: 查找所有包含 VPNav 的元素
  if (!navBarContent) {
    const allNavElements = document.querySelectorAll('[class*="VPNav"]')
    for (const el of Array.from(allNavElements)) {
      if (el.classList.contains('VPNavBarContent') || 
          el.classList.contains('content') ||
          el.querySelector('.VPNavBarContent') ||
          el.querySelector('.content')) {
        navBarContent = el.querySelector('.VPNavBarContent') || 
                       el.querySelector('.content') || 
                       el
        break
      }
    }
  }
  
  // 方法4: 查找 header 或 nav
  if (!navBarContent) {
    const header = document.querySelector('header')
    if (header) {
      navBarContent = header.querySelector('[class*="VPNav"]') || 
                     header.querySelector('.content') || 
                     header
    } else {
      const nav = document.querySelector('nav')
      if (nav) {
        navBarContent = nav.querySelector('[class*="VPNav"]') || 
                       nav.querySelector('.content') || 
                       nav
      }
    }
  }
  
  if (!navBarContent) {
    console.error('❌ 无法找到导航栏元素')
    return
  }

  // 创建版本选择器
  const versionSelector = document.createElement('div')
  versionSelector.className = 'version-selector'
  versionSelector.innerHTML = `
    <select class="version-select">
      <option value="1.0.0" selected>1.0.0</option>
      <option value="0.9.0">0.9.0</option>
    </select>
  `
  const selectEl = versionSelector.querySelector('select')
  if (selectEl) {
    selectEl.addEventListener('change', (e) => {
      const target = e.target as HTMLSelectElement
      console.log('Version changed:', target.value)
    })
  }

  // 创建语言选择器
  const languageSelector = document.createElement('div')
  languageSelector.className = 'language-selector'
  languageSelector.innerHTML = `
    <a href="/" class="lang-link active" aria-label="简体中文">文</a>
    <a href="/en/" class="lang-link" aria-label="English">EN</a>
  `

  // 创建容器
  const wrapper = document.createElement('div')
  wrapper.className = 'nav-extra-wrapper'
  wrapper.style.cssText = 'display: flex !important; align-items: center !important; gap: 16px !important; margin-left: 16px !important; visibility: visible !important; opacity: 1 !important;'
  wrapper.appendChild(versionSelector)
  wrapper.appendChild(languageSelector)

  // 插入到导航栏
  try {
    navBarContent.appendChild(wrapper)
    console.log('✅✅✅ 导航栏组件已成功注入！位置:', navBarContent.className)
    
    // 验证是否真的添加成功
    setTimeout(() => {
      const added = document.querySelector('.nav-extra-wrapper')
      if (added) {
        const styles = window.getComputedStyle(added)
        console.log('✅ 验证成功：组件已存在于 DOM 中')
        console.log('组件位置:', added.parentElement?.className)
        console.log('组件 display:', styles.display)
        console.log('组件 visibility:', styles.visibility)
        console.log('组件 opacity:', styles.opacity)
      } else {
        console.error('❌ 验证失败：组件未找到')
      }
    }, 100)
  } catch (e) {
    console.error('❌ 注入失败:', e)
  }
}

// 导航栏额外内容（备用方案 - 通过 slot）
function NavBarExtra() {
  return h('div', { 
    class: 'nav-extra-wrapper',
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      marginLeft: '16px'
    }
  }, [
    h(VersionSelector),
    h(LanguageSelector)
  ])
}

// 版本选择器组件
function VersionSelector() {
  return h('div', { 
    class: 'version-selector'
  }, [
    h('select', {
      class: 'version-select',
      value: '1.0.0',
      onChange: (e: Event) => {
        const target = e.target as HTMLSelectElement
        if (target.value) {
          console.log('Version changed:', target.value)
        }
      }
    }, [
      h('option', { value: '1.0.0' }, '1.0.0'),
      h('option', { value: '0.9.0' }, '0.9.0')
    ])
  ])
}

// 语言选择器组件
function LanguageSelector() {
  return h('div', { 
    class: 'language-selector'
  }, [
    h('a', {
      href: '/',
      class: 'lang-link active',
      'aria-label': '简体中文'
    }, '文'),
    h('a', {
      href: '/en/',
      class: 'lang-link',
      'aria-label': 'English'
    }, 'EN')
  ])
}

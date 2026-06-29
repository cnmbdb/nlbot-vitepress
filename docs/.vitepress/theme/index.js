import DefaultTheme from 'vitepress/theme'
import './custom.css'
import { h } from 'vue'
import TelegramButton from './components/TelegramButton.vue'
import CenteredNavTitle from './components/CenteredNavTitle.vue'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'nav-bar-content-before': () => h(CenteredNavTitle),
      'sidebar-nav-after': () => h(TelegramButton)
    })
  }
}

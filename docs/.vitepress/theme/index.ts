import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import ZeogptCta from './components/ZeogptCta.vue'
import RiskNotice from './components/RiskNotice.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('ZeogptCta', ZeogptCta)
    app.component('RiskNotice', RiskNotice)
  }
} satisfies Theme

import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import ZeogptCta from './components/ZeogptCta.vue'
import RiskNotice from './components/RiskNotice.vue'
import AgentConversionStrip from './components/AgentConversionStrip.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('ZeogptCta', ZeogptCta)
    app.component('RiskNotice', RiskNotice)
    app.component('AgentConversionStrip', AgentConversionStrip)
  }
} satisfies Theme

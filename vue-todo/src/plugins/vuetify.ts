/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { ThemeDefinition, createVuetify } from 'vuetify'

const customDarkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    background: '#070417',
    surface: '#292639',
    primary: '#3B3753',
    secondary: '#6ADD8A'

  }
}

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'customDarkTheme',
    themes: {
      customDarkTheme
    }
  }
})

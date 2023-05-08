import {
  defineConfig, presetWind,
  presetWebFonts, transformerVariantGroup
} from 'unocss'


export default defineConfig({
  theme: {
    colors: {
      db: "#121316",
      dbm: "#191a1d",
      dbl: "#202124",
      dv: '#6E3AFF',
    },
    breakpoints: {
      '2xl': '1535px',
      xl: '1279px',
      lg: '1023px',
      '2md': '870px',
      md: '767px',
      '2sm': '710px',
      sm: '639px',
    }
  },
  presets: [
    presetWind(),
    presetWebFonts({}),
  ],
  transformers: [
    transformerVariantGroup()
  ]
})

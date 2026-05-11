import { darkTheme } from 'naive-ui'

function createTheme(primaryColor, isDark = false) {
  return {
    naiveTheme: isDark ? darkTheme : null,
    overrides: {
      common: {
        primaryColor,
        primaryColorHover: primaryColor,
        primaryColorPressed: primaryColor,
        primaryColorSuppl: primaryColor,
      },
      Button: {
        borderRadiusMedium: '8px',
      },
      Card: {
        borderRadius: '12px',
      },
    },
  }
}

export const colorThemeOptions = [
  {
    label: 'Light Blue',
    value: 'light-blue',
  },
  {
    label: 'Dark Blue',
    value: 'dark-blue',
  },
  {
    label: 'Light Green',
    value: 'light-green',
  },
  {
    label: 'Dark Green',
    value: 'dark-green',
  },
  {
    label: 'Light Purple',
    value: 'light-purple',
  },
  {
    label: 'Dark Purple',
    value: 'dark-purple',
  },
  {
    label: 'Light Orange',
    value: 'light-orange',
  },
  {
    label: 'Dark Orange',
    value: 'dark-orange',
  },
]

export const colorThemeMap = {
  'light-blue': createTheme('#2080f0', false),
  'dark-blue': createTheme('#2080f0', true),

  'light-green': createTheme('#18a058', false),
  'dark-green': createTheme('#18a058', true),

  'light-purple': createTheme('#8a2be2', false),
  'dark-purple': createTheme('#8a2be2', true),

  'light-orange': createTheme('#f0a020', false),
  'dark-orange': createTheme('#f0a020', true),
}

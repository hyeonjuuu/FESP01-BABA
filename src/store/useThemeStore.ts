import { create } from 'zustand'

interface themeStore {
  darkMode: boolean
  toggleDarkMode: () => void
}

const useThemeStore = create<themeStore>(set => ({
  darkMode: localStorage.getItem('darkMode') === 'true',
  toggleDarkMode: () => {
    set(state => {
      const newDarkMode = !state.darkMode
      localStorage.setItem('darkMode', newDarkMode.toString())
      return { darkMode: newDarkMode }
    })
  }
}))

export default useThemeStore

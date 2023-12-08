import { create } from 'zustand'

interface themeStore {
  darkMode: boolean
  toggleDarkMode: () => void
}

const useThemeStore = create<themeStore>(set => ({
  darkMode: false,
  toggleDarkMode: () => set(state => ({ darkMode: !state.darkMode }))
}))

export default useThemeStore

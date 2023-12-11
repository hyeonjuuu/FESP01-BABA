import { create } from 'zustand'

interface themeStore {
  $darkMode: boolean
  toggleDarkMode: () => void
}

const useThemeStore = create<themeStore>(set => ({
  $darkMode: localStorage.getItem('$darkMode') === 'true',
  toggleDarkMode: () => {
    set(state => {
      const new$darkMode = !state.$darkMode
      localStorage.setItem('$darkMode', new$darkMode.toString())
      return { $darkMode: new$darkMode }
    })
  }
}))

export default useThemeStore

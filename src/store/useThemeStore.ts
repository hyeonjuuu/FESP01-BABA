import { create } from 'zustand'

interface themeStore {
  $darkMode: boolean
  toggleDarkMode: () => void
}

const useThemeStore = create<themeStore>(set => ({
  $darkMode: localStorage.getItem('$darkMode') === 'true',
  toggleDarkMode: () => {
    set(state => {
      const newdarkMode = !state.$darkMode
      localStorage.setItem('$darkMode', newdarkMode.toString())
      return { $darkMode: newdarkMode }
    })
  }
}))

export default useThemeStore

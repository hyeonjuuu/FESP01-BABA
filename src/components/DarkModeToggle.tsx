import useThemeStore from '@/store/useThemeStore'

function DarkModeToggle() {
  const { darkMode, toggleDarkMode } = useThemeStore()

  return (
    <button onClick={toggleDarkMode}>
      {darkMode ? 'Light Mode' : 'Dark Mode'}
    </button>
  )
}

export default DarkModeToggle

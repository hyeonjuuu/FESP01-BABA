import { create } from 'zustand'

interface UserData {
  email: string
  username: string
  nickname: string
}

interface AuthStore {
  isAuthenticated: boolean
  user: null | UserData
  login: () => void
  logout: () => void
}

const initialAuthState = (() => {
  const storedData = localStorage.getItem('userData')
  if (storedData) {
    return { isAuthenticated: true, user: JSON.parse(storedData) }
  } else {
    return { isAuthenticated: false, user: null }
  }
})()

export const useAuthStore = create<AuthStore>(set => ({
  ...initialAuthState,
  login: () => {
    // 로컬 스토리지에서 값을 가져와서 상태를 업데이트
    const storedData = localStorage.getItem('userData')
    const userData: UserData | null = storedData ? JSON.parse(storedData) : null

    set({ isAuthenticated: true, user: userData })
  },
  logout: () => {
    set({ isAuthenticated: false, user: null })
    localStorage.removeItem('userData')
  }
}))

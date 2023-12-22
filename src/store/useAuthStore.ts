import { create } from 'zustand'
import { supabase } from 'utils/supabaseClient'
import { getProfileImgUrl } from '@/api/profileImgApi'

interface UserData {
  email?: string
  username: string | undefined
  nickname: string
  profileIcon: string | null
}

interface AuthStore {
  isAuthenticated: boolean
  user: null | UserData
  login: (email: string, password: string) => Promise<void>
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
  login: async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (data && data.user) {
        const userIconImage = await getProfileImgUrl(data.user.id)
        // Supabase의 User 타입에서 UserData 타입으로 변환
        const userData: UserData = {
          username: data.user.email,
          nickname: 'user_nickname',
          profileIcon: userIconImage
        }

        localStorage.setItem('userData', JSON.stringify(userData))
        set({ isAuthenticated: true, user: userData })
        alert('로그인에 성공하였습니다!')
      } else if (error) {
        console.error('로그인 실패:', error.message)
        localStorage.removeItem('userData')
        set({ isAuthenticated: false, user: null })
      }
    } catch (error) {
      console.error('❌ Error:', error)
    }
  },
  logout: () => {
    set({ isAuthenticated: false, user: null })
    localStorage.removeItem('userData')
  }
}))

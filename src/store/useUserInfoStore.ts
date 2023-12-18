import userInfoInLs from '@/utils/userInfoInLs'
import { create } from 'zustand'

interface UserInfo {
  userId: string | null
  userEmail: string | null
  setUserId: (userId: string | null) => void
  setUserEmail: (userEmail: string | null) => void
}

const userInfo = userInfoInLs()
const userId = userInfo.userId
const userEmail = userInfo.userEmail

const useUserInfoStore = create<UserInfo>(set => ({
  userId: userId,
  userEmail: userEmail,
  setUserId: userId => set({ userId }),
  setUserEmail: userEmail => set({ userEmail })
}))

export default useUserInfoStore

// 주의할 점은 이렇게 초기 상태를 설정하면 앱이 시작될 때 로컬 스토리지의 userId가 변경되지 않는 이상 변경되지 않습니다. 만약 나중에 앱 실행 중에 userId를 동적으로 업데이트하고 싶다면 setUserId 함수를 이용하여 수동으로 업데이트해야 합니다.

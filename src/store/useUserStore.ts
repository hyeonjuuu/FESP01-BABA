import { create } from 'zustand'

// type userDataProps = {
//   userImg: string
//   setUserImg: (userId: string) => void
// }

// export const useUserStore = create<userDataProps>(set => ({
//   userImg: '',
//   setUserImg: userId => set({ userImg: userId })
// }))
// export const useUserStore = create<userDataProps>(set => ({
//   userData: [],
//   setUserData: (username, nickname, profileImg) =>
//     set({ userData: [username, nickname, profileImg] })
// }))
type userDataProps = {
  username: string
  nickname: string
  profileImg: string
  userWriter: { writer: string }[]
  setUsername: (value: string) => void
  setNickname: (value: string) => void
  setProfileImg: (value: string) => void
  setUserWriter: (value: string) => void
  setUserData: (username: string, nickname: string, profileImg: string) => void
}

export const useUserStore = create<userDataProps>(set => ({
  username: '',
  nickname: '',
  profileImg: '',
  userWriter: [],
  setUsername: value => set({ username: value }),
  setNickname: value => set({ nickname: value }),
  setProfileImg: value => set({ profileImg: value }),
  setUserWriter: value =>
    set(state => ({ userWriter: [...state.userWriter, { writer: value }] })),
  setUserData: (username, nickname, profileImg) =>
    set({ username, nickname, profileImg })
}))

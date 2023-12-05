import { create } from 'zustand'

interface userStore {
  yourState: any
  yourAction: (val: any) => void
}
export const useuserStore = create<userStore>(set => ({
  yourState: 'VALUE',
  yourAction: val => set(state => ({ yourState: state.yourState }))
}))

import { getMetaData } from './userData'

const userInfoInLs = (): {
  userId: string | null
  userEmail: string | null
} => {
  // const userInfo = localStorage.getItem('userData')
  const userInfo = localStorage.getItem('sb-ufinqahbxsrpjbqmrvti-auth-token')
  // console.log('#userInfo: ', userInfo)

  const userId = userInfo ? JSON.parse(userInfo)?.user?.id : null
  // const userId = userInfo ? JSON.parse(userInfo)?.user_email : null
  const userEmail = userInfo ? JSON.parse(userInfo)?.user?.email : null
  // const userEmail = userInfo ? JSON.parse(userInfo)?.username : null

  console.log('#userId: ', userId)
  console.log('#userEmail: ', userEmail)

  // getMetaData('abc123@gmail.com')

  return { userId, userEmail }
}

export default userInfoInLs

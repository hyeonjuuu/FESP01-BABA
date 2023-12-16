const userInfoInLs = (): {
  userId: string | null
  userEmail: string | null
} => {
  const userInfo = localStorage.getItem('userData')
  const userId = userInfo ? JSON.parse(userInfo)?.user?.id : null
  const userEmail = userInfo ? JSON.parse(userInfo)?.user?.email : null

  return { userId, userEmail }
}

export default userInfoInLs

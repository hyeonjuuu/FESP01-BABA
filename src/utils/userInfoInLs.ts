import { useState, useEffect } from 'react'

const userInfoInLs = (): string | null => {
  // const [userId, setUserId] = useState<string | null>(null)

  // useEffect(() => {
  //   const userInfo = localStorage.getItem('userData')

  //   if (userInfo) {
  //     const userObj = JSON.parse(userInfo)
  //     const userIdFromStorage = userObj?.user?.id
  //     if (userIdFromStorage) {
  //       setUserId(userIdFromStorage)
  //     }
  //   }

  //   console.log('userId: ', userId)
  // }, [])
  const userInfo = localStorage.getItem('userData')
  const userId = userInfo ? JSON.parse(userInfo)?.user?.id : null
  console.log('userId: ', userId)

  return userId
}

export default userInfoInLs

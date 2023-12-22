import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { getProfileImgUrl } from '@/api/profileImgApi'
import userInfoInLs from '@/utils/userInfoInLs'
import UserIcon from '@/assets/icon/User.png'

function AddUserIcon() {
  const { userId } = userInfoInLs()
  const [renderProfileImg, setRenderProfileImg] = useState<string | undefined>(
    undefined
  )

  // 프로필 이미지 렌더링
  const fetchAndRenderProfileImg = async () => {
    if (userId) {
      try {
        const imgSrc = await getProfileImgUrl(userId)
        if (imgSrc) {
          setRenderProfileImg(imgSrc)
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    fetchAndRenderProfileImg()
  }, [])

  return (
    <>
      <Warpper
        src={
          renderProfileImg
            ? `https://ufinqahbxsrpjbqmrvti.supabase.co/storage/v1/object/public/userImage/${renderProfileImg}`
            : UserIcon
        }
        alt=""
      />
    </>
  )
}

export default AddUserIcon

const Warpper = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  /* border: 2.5px solid rgba(0, 0, 0, 0.8); */
  /* background-color: #29c7c8; */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 19px;
`

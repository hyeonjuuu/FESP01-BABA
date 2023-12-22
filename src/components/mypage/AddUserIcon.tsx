import styled from 'styled-components'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'

function AddUserIcon() {
  const [profileIcon, setProfileIcon] = useState('')

  useEffect(() => {
    // 로컬스토리지에서 userData 불러오기
    const userDataString = localStorage.getItem('userData')

    const userData = JSON.parse(userDataString as string)

    const profileIcon = userData && userData.profileIcon

    setProfileIcon(profileIcon)
  }, [])

  return (
    <>
      {/* <Warpper>
        <FontAwesomeIcon icon={faPlus} />
      </Warpper> */}
      <Warpper
        src={`https://ufinqahbxsrpjbqmrvti.supabase.co/storage/v1/object/public/userImage/${profileIcon}`}
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

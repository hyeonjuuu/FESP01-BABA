import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL as string,
  import.meta.env.VITE_SUPABASE_KEY as string
)

interface UserData {
  email: string
  username: string
  nickname: string
  password: string
}

interface UserloginData {
  email: string
  password: string
}

// 사용자 등록 및 추가 정보 저장
export const enterUserData = async (
  userData: UserData
): Promise<string | undefined> => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password
    })

    if (data) return data?.user?.id
    else console.log('회원가입 실패:', error)
  } catch (error) {
    console.error(error)
  }
}

// 사용자의 정보를 데이터테이블에 저장
export const insertUserData = async (userData: UserData, uuid: string) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          user_email: uuid,
          username: userData.username,
          nickname: userData.nickname
        }
      ])
      .select()

    if (data) console.log(data)
    else console.log(error)
  } catch (error) {
    console.error(`❌ 데이터 삽입 실패: ${error}`)
  }
}

// 깃허브 사용자 등록 및 로그인
export const gitHubLogin = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github'
    })
    if (error) {
      console.error('GitHub 로그인 실패:', error.message)
    } else {
      localStorage.setItem('userData', JSON.stringify(data))
      console.log('GitHub 로그인 성공:', data)
    }
  } catch (error) {
    console.error(`🥺 Error: ${error}`)
  }
}

// 사용자 로그인
export const userLogin = async (userloginData: UserloginData) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: userloginData.email,
      password: userloginData.password
    })

    if (data) {
      // 사용자의 정보를 로컬스토리지에 저장합니다.
      localStorage.setItem('userData', JSON.stringify(data))
      console.log('로그인 성공:', data)
      return data
    } else if (error) {
      console.error('로그인 실패:', error.message)
    }
  } catch (error) {
    console.error('❌ Error:', error)
  }
}

// 현재 로그인한 사용자의 정보 가져오기
export const getMetaData = async () => {
  const { data, error } = await supabase.auth.getUser('hori04@gmail.com')

  if (data) {
    // 사용자 메타데이터 확인
    const metadata = data.user?.user_metadata

    if (metadata) {
      const { username, nickname } = metadata
      console.log(`Username: ${username}, Nickname: ${nickname}`)
    } else {
      console.log('사용자 메타데이터가 없습니다.')
    }
  } else if (error) {
    console.error(
      '사용자 정보를 가져오는 도중 오류가 발생했습니다.',
      error.message
    )
  }
}

// SUPABASE Storage에서 사용자의 이미지를 가져오는 함수
// export const getImageUrl = async (imageName: string) => {
//   try {
//     const { publicURL, error } = await supabase.storage
//       .from('YOUR_STORAGE_BUCKET')
//       .getPublicUrl(imageName)

//     if (publicURL) {
//       console.log('Image URL:', publicURL)
//       return publicURL
//     } else {
//       console.error('Error getting image URL:', error.message)
//     }
//   } catch (error) {
//     console.error('❌ Error:', error)
//   }
// }

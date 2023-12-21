import { supabase } from '@/utils/supabaseClient'

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
      // localStorage.setItem('userData', JSON.stringify(data))
      const metadata = await getMetaData(userloginData.email) // 메타데이터 가져오기
      localStorage.setItem('userData', JSON.stringify({ ...data, metadata })) // 로그인 정보와 메타데이터를 함께 저장
      console.log('로그인 성공:', data)
      return
    } else if (error) {
      console.error('로그인 실패:', error.message)
    }
  } catch (error) {
    console.error('❌ Error:', error)
  }
}

// 현재 로그인한 사용자의 정보 가져오기
// export const getMetaData = async () => {
export const getMetaData = async (email: string) => {
  // const { data, error } = await supabase.auth.getUser('hori04@gmail.com')
  const { data, error } = await supabase.auth.getUser(email)

  if (data) {
    // 사용자 메타데이터 확인
    const metadata = data.user?.user_metadata

    if (metadata) {
      const { username, nickname } = metadata
      console.log(`Username: ${username}, Nickname: ${nickname}`)
      return metadata
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

// 로그인된 사용자의 세션을 확인합니다.
export const checkSession = async () => {
  try {
    const { data: session, error } = await supabase.auth.getSession()

    if (error) {
      console.error('세션 확인 실패:', error.message)
      return null
    }

    if (session) {
      console.log('현재 세션:', session)
      return session
    } else {
      console.log('세션 없음')
      return null
    }
  } catch (error) {
    console.error('❌ Error:', error)
    throw error // 더 상세한 오류 처리가 필요할 경우 여기서 처리하세요.
  }
}

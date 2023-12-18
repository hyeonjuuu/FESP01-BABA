import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  import.meta.env.VITE_SUPABASE_URL as string,
  import.meta.env.VITE_SUPABASE_KEY as string
)

// storage에 유저 이미지 업로드
export const uploadProfileImg = async (file: File): Promise<string | null> => {
  try {
    const fileExt = file.name.split('.').pop()
    const newName = `${Date.now()}.${fileExt}`

    const { data, error } = await supabaseAdmin.storage
      .from('userImage')
      .upload(`public/${newName}`, file)

    if (error) {
      console.error(`이미지 데이터 통신에 실패하였습니다..😵‍💫 ${error.message}`)
      return null
    } else {
      console.log('Supabase 이미지 삽입 성공:', data)
      // 이미지 URL 반환
      return data?.path ?? null
    }
  } catch (error) {
    console.error(`이미지 데이터 통신에 실패하였습니다..😵‍💫 ${error}`)
    return null
  }
}

// 유저 프로필을 유저 테이블에 등록
export const addImgUrltoUsers = async (profile_img: string) => {
  try {
    const { data, error } = await supabaseAdmin.from('users').upsert([
      {
        profile_img
      }
    ])

    if (error) {
      console.error(`데이터 통신에 실패하였습니다..😵‍💫 ${error.message}`)
    } else {
      console.log('Supabase 프로필 이미지 삽입 성공:', data)
    }
  } catch (error) {
    console.error(`데이터 통신에 실패하였습니다..😵‍💫 ${error}`)
  }
}

// 프로필 이미지 가져오기
export const getProfileImgUrl = async (id: number): Promise<string | null> => {
  try {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('profile_img')
      .eq('user_unique_id', id)

    if (error) {
      console.error(`데이터 통신에 실패하였습니다..😵‍💫 ${error.message}`)
      return null
    } else {
      console.log('Supabase 이미지 가져오기 성공:', data)

      // 첫 번째 객체의 img_url 반환
      return data && data.length > 0 ? data[0].profile_img : null
    }
  } catch (error) {
    console.error(`데이터 통신에 실패하였습니다..😵‍💫 ${error}`)
    return null
  }
}

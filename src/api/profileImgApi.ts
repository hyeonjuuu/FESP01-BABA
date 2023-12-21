import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  import.meta.env.VITE_SUPABASE_URL as string,
  import.meta.env.VITE_SUPABASE_KEY as string
)

//# 프로필 이미지 등록
// storage에 유저 이미지 업로드
export const uploadProfileImg = async (
  file: File,
  id: string
): Promise<string | null> => {
  try {
    // 1. 사용자의 현재 프로필 이미지 URL을 가져옵니다.
    const oldImgUrl = await getProfileImgUrl(id)

    // 2. 가져온 URL을 사용해서 Storage에서 해당 이미지를 삭제합니다.
    if (oldImgUrl) {
      const oldImgName = oldImgUrl.split('/').pop()
      await supabaseAdmin.storage
        .from('userImage')
        .remove([`public/${oldImgName}`])
    }

    const fileExt = file.name.split('.').pop()
    const newName = `${Date.now()}.${fileExt}`

    // 3. 새 이미지를 업로드합니다.
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
export const addImgUrlToUsers = async (
  id: string,
  profile_img: string | null
) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('users')
      .update([
        {
          profile_img
        }
      ])
      .eq('user_email', id)

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
export const getProfileImgUrl = async (id: string): Promise<string | null> => {
  try {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('profile_img')
      .eq('user_email', id)

    if (error) {
      console.error(`데이터 통신에 실패하였습니다..😵‍💫 ${error.message}`)
      return null
    } else {
      // console.log('Supabase 이미지 가져오기 성공:', data)

      // 첫 번째 객체의 img_url 반환
      return data && data.length > 0 ? data[0].profile_img : null
    }
  } catch (error) {
    console.error(`데이터 통신에 실패하였습니다..😵‍💫 ${error}`)
    return null
  }
}

// 유저들의 프로필 이미지 가져오기
// export const getProfileImgs = async (
//   userEmails: string[]
// ): Promise<string[] | null> => {
//   try {
//     const { data, error } = await supabaseAdmin
//       .from('users')
//       .select('profile_img')
//       .eq('user_email', userEmails)

//     if (error) {
//       console.error(`데이터 통신에 실패하였습니다..😵‍💫 ${error.message}`)
//       return null
//     } else {
//       // 여러 행 중에서 각 행의 profile_img 값을 추출하여 배열로 반환
//       console.log('유저들의 프로필 data: ', data)
//       return data ? data.map(user => user.profile_img) : null
//     }
//   } catch (error) {
//     console.error(`데이터 통신에 실패하였습니다..😵‍💫 ${error}`)
//     return null
//   }
// }

//# 프로필 이미지 삭제
export const deleteProfileImg = async (id: string) => {
  try {
    const oldImgUrl = await getProfileImgUrl(id)

    if (oldImgUrl) {
      const oldImgName = oldImgUrl.split('/').pop()
      await supabaseAdmin.storage
        .from('userImage')
        .remove([`public/${oldImgName}`])
    }
  } catch (error) {
    console.error(`데이터 통신에 실패하였습니다..😵‍💫 ${error}`)
    return null
  }
}

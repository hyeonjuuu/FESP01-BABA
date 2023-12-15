import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  import.meta.env.VITE_SUPABASE_URL as string,
  import.meta.env.VITE_SUPABASE_KEY as string
)

// 리뷰 등록
export const addReview = async (
  movie_id: number,
  user_id: string,
  text: string,
  ott: string[],
  rating: number,
  movie_title: string
) => {
  try {
    const { data, error } = await supabaseAdmin.from('reviews').insert([
      {
        movie_id,
        user_id,
        text,
        ott,
        rating,
        movie_title
      }
    ])

    if (error) {
      console.error(`데이터 통신에 실패하였습니다..😵‍💫 ${error.message}`)
    } else {
      console.log('Supabase 데이터 삽입 성공:', data)
    }
  } catch (error) {
    console.error(`데이터 통신에 실패하였습니다..😵‍💫 ${error}`)
  }
}

// storage에 이미지 업로드
export const uploadImage = async (file: File): Promise<void> => {
  try {
    // 파일 확장자 추출
    const fileExt = file.name.split('.').pop()
    // 현재 시간을 이용하여 파일 이름 생성
    const newName = `${Date.now()}.${fileExt}`

    const { data, error } = await supabaseAdmin.storage
      .from('movieImage')
      .upload(`public/${newName}`, file)

    if (error) {
      console.error(`이미지 데이터 통신에 실패하였습니다..😵‍💫 ${error.message}`)
    } else {
      console.log('Supabase 이미지 삽입 성공:', data)
    }
  } catch (error) {
    console.error(`이미지 데이터 통신에 실패하였습니다..😵‍💫 ${error}`)
  }
}

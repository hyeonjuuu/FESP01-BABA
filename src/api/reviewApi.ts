import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
)

// 리뷰 등록
export const addReview = async (
  movie_id?: number,
  user_id?: string,
  text?: string,
  ott?: string[],
  rating?: number,
  movie_title?: string,
  filePath?: string
) => {
  try {
    const { data, error } = await supabase.from('reviews').upsert([
      {
        movie_id,
        user_id,
        text,
        ott,
        rating,
        movie_title,
        img_url: filePath
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

export async function uploadFile(poster: any) {
  try {
    const { data, error } = await supabase.storage
      .from('movieImage')
      .upload(`public/${poster}`, poster, {
        upsert: true
      })

    console.log(data)
    console.log(poster)

    if (error) {
      console.error('에러 발생:', error.message)
    } else {
      console.log('성공:', data)
      const filePath = `public/${poster.name}`
      // await addReview()
    }
  } catch (error) {
    const supabaseError = error as Error
    console.error('예외 발생:', supabaseError.message)
  }
}

import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  'https://ufinqahbxsrpjbqmrvti.supabase.co',
  import.meta.env.VITE_SUPABASE_URL as string
)

// 리뷰 등록
export const addReview = async (
  movie_id: string,
  user_id: string,
  text: string,
  ott: string[],
  rating: number
) => {
  try {
    const { data, error } = await supabaseAdmin.from('reviews').insert([
      {
        movie_id,
        user_id,
        text,
        ott,
        rating
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

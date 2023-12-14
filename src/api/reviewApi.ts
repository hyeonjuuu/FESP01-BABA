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
  movie_title: string | undefined
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

// Upload file using standard upload
export async function uploadFile(poster: string | null) {
  const { data, error } = await supabaseAdmin.storage
    .from('movieImage')
    .upload(`public/`, poster)
  if (error) {
    // Handle error
  } else {
    // Handle success
  }
}

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
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
    const { data, error } = await supabase.from('reviews').insert([
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

// // Upload file using standard upload
// export async function uploadFile(poster: string | null) {
//   const { data, error } = await supabaseAdmin.storage
//     .from('movieImage')
//     .upload('public', 'pAUpo3qYaSiclzKFzkQyYFyT28N.jpg')

//   console.log(poster)

//   if (error) {
//     console.error('에러발생')
//   } else {
//     // Handle success
//   }
// }
export async function uploadFile(poster: any) {
  try {
    const { data, error } = await supabase.storage
      .from('movieImage')
      .upload(`public${poster}`, poster, {
        // 필요에 따라 추가적인 옵션을 설정할 수 있습니다.
      })

    if (error) {
      console.error('에러 발생:', error.message)
    } else {
      console.log('성공:', data)
    }
  } catch (error) {
    console.error('예외 발생:', error.message)
  }
}

function generateUniqueFileName() {
  // 파일에 고유한 이름을 생성하는 로직을 구현하거나
  // 필요에 따라 다른 방식으로 파일 이름을 설정합니다.
  return Date.now().toString()
}

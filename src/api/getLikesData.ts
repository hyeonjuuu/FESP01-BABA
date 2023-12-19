import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  `${import.meta.env.VITE_SUPABASE_URL}`,
  `${import.meta.env.VITE_SUPABASE_KEY}`
)

export const fetchAllLikes = async () => {
  const { data } = await supabase.from('likes').select('*')
  return data
  // console.log(data)
}

// export const matchLike = async (reviewId: number, userId: string) => {
//   const { data } = await supabase
//     .from('likes')
//     .select()
//     .match({ review_id: reviewId, user_id: userId })

//   return data
// }
export const matchLike = async (userId: string) => {
  const { data } = await supabase
    .from('likes')
    .select('review_id')
    .match({ user_id: userId })

  return data
}

export const addLike = async (likeItem: LikesType) => {
  await supabase.from('likes').insert(likeItem).select()
}

export const deleteLikes = async (itemId?: number) => {
  await supabase.from('likes').delete().match({ review_id: itemId })
}

// 즐겨찾기 리뷰 가져오기
export const favoriteReviews = async (userId: string) => {
  const { data } = await supabase
    .from('reviews')
    .select('likes_id')
    .match({ likes_id: userId })

  return data
}

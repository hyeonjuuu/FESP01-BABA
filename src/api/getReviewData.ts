import { createClient } from '@supabase/supabase-js'
import { supabase } from '@/utils/supabaseClient'

// reviews의 데이터들을 가져옵니다.
export const getReviewData = async (): Promise<ReviewData[] | null> => {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .order('created_at', { ascending: false })

  if (data) {
    return data
  } else {
    console.log(error)
    return null
  }
}

// reviews데이터의 user_id를 기반으로 users테이블의 nickname을 가져옵니다.
export const getReviewDataWithUserInfo = async () => {
  const { data: reviewsData, error: reviewsError } = await supabase
    .from('reviews')
    .select('*')

  if (reviewsData) {
    const userIds = reviewsData
      .filter(review => review.user_id)
      .map(review => review.user_id)

    const { data: usersData, error: usersError } = await supabase
      .from('users')
      .select('nickname, user_email')
      .in('user_email', userIds)

    if (usersData) {
      return usersData
    } else {
      console.error(usersError)
    }
  } else {
    console.error(reviewsError)
    return null
  }
}

// reviews 테이블의 id를 기반으로 해당 리뷰 데이터 가져오기
export const getReviewDataForEdit = async (
  reviewId: number
): Promise<any | null> => {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('id', reviewId)

  if (data) {
    console.log('getReviewDataForEdit: ', data)
    return data
  } else {
    console.error(error)
    return null
  }
}

// users 테이블의 email로 닉네임 가져오기
export const getNickname = async (reviewId: string): Promise<any | null> => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('user_email', reviewId)

  if (data) {
    console.log('getNickname: ', data)
    return data
  } else {
    console.error(error)
    return null
  }
}

export const getGenreReviewData = async (
  genreId: number
): Promise<ReviewData[] | null> => {
  const { data, error } = await supabase
    .from('reviews')
    .select()
    .order('created_at', { ascending: false })
    .or(`genre_ids.cs.${genreId}`)

  if (data) {
    console.log('getGenreReviewData: ', data)
    return data
  } else {
    console.error(error)
    return null
  }
}

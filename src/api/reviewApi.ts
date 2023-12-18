import { createClient } from '@supabase/supabase-js'
import { getProfileImgUrl } from './profileImgApi'

const supabaseAdmin = createClient(
  import.meta.env.VITE_SUPABASE_URL as string,
  import.meta.env.VITE_SUPABASE_KEY as string
)

//# 리뷰 등록
export const addReview = async (
  movie_id: number,
  user_id: string,
  text: string,
  ott: string[],
  rating: number,
  movie_title: string
  // id?: Number
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
        // id
      }
    ])

    if (error) {
      console.error(`데이터 통신에 실패하였습니다..😵‍💫 ${error.message}`)
      throw error // 에러를 다시 던져서 상위 함수에서 잡을 수 있게 함
    } else {
      console.log('Supabase 데이터 삽입 성공:', data)
    }
  } catch (error) {
    console.error(`데이터 통신에 실패하였습니다..😵‍💫 ${error}`)
    throw error
  }
}

// storage에 이미지 업로드
export const uploadImage = async (file: File): Promise<string | null> => {
  try {
    const fileExt = file.name.split('.').pop()
    const newName = `${Date.now()}.${fileExt}`

    const { data, error } = await supabaseAdmin.storage
      .from('movieImage')
      .upload(`public/${newName}`, file)

    if (error) {
      console.error(`이미지 데이터 통신에 실패하였습니다..😵‍💫 ${error.message}`)
      throw error
    } else {
      console.log('Supabase 이미지 삽입 성공:', data)
      // 이미지 URL 반환
      return data?.path ?? null
    }
  } catch (error) {
    console.error(`이미지 데이터 통신에 실패하였습니다..😵‍💫 ${error}`)
    throw error
  }
}

//# 사용자 이미지와 리뷰 등록
export const addReviewWithImgUrl = async (
  movie_id: number,
  user_id: string,
  text: string,
  ott: string[],
  rating: number,
  movie_title: string,
  img_url: string
  // id?: Number
) => {
  try {
    const oldImgUrl = await getMovieImgUrl(user_id)

    if (oldImgUrl) {
      const oldImgName = oldImgUrl.split('/').pop()
      await supabaseAdmin.storage
        .from('movieImage')
        .remove([`public/${oldImgName}`])
    }

    const { data, error } = await supabaseAdmin.from('reviews').insert([
      {
        movie_id,
        user_id,
        text,
        ott,
        rating,
        movie_title,
        img_url
        // id
      }
    ])

    if (error) {
      console.error(`데이터 통신에 실패하였습니다..😵‍💫 ${error.message}`)
      throw error
    } else {
      console.log('Supabase 리뷰와 이미지 삽입 성공:', data)
    }
  } catch (error) {
    console.error(`데이터 통신에 실패하였습니다..😵‍💫 ${error}`)
    throw error
  }
}

// 사용자 이미지 가져오기
export const getImgUrl = async (id: number): Promise<string | null> => {
  try {
    const { data, error } = await supabaseAdmin
      .from('reviews')
      .select('img_url')
      .eq('id', id)

    if (error) {
      console.error(`데이터 통신에 실패하였습니다..😵‍💫 ${error.message}`)
      throw error
    } else {
      console.log('Supabase 이미지 가져오기 성공:', data)

      // 첫 번째 객체의 img_url 반환
      return data && data.length > 0 ? data[0].img_url : null
    }
  } catch (error) {
    console.error(`데이터 통신에 실패하였습니다..😵‍💫 ${error}`)
    throw error
  }
}

//# 리뷰 가져오기
export const getUserReviews = async (id: string) => {
  const { data, error } = await supabaseAdmin
    .from('reviews')
    .select('*')
    .eq('user_id', id)

  if (data) {
    console.log('data: ', data)
    return data
  } else {
    console.log(error)
    return null
  }
}

//# 리뷰 수정
export const editReview = async (
  movie_id: number,
  user_id: string,
  text: string,
  ott: string[],
  rating: number,
  movie_title: string,
  id: Number
) => {
  try {
    const { data, error } = await supabaseAdmin.from('reviews').insert([
      {
        movie_id,
        user_id,
        text,
        ott,
        rating,
        movie_title,
        id
      }
    ])

    if (error) {
      console.error(`데이터 통신에 실패하였습니다..😵‍💫 ${error.message}`)
      throw error // 에러를 다시 던져서 상위 함수에서 잡을 수 있게 함
    } else {
      console.log('Supabase 데이터 삽입 성공:', data)
    }
  } catch (error) {
    console.error(`데이터 통신에 실패하였습니다..😵‍💫 ${error}`)
    throw error
  }
}

//# 사용자 이미지 포함된 리뷰 수정
export const editReviewWithImgUrl = async (
  movie_id: number,
  user_id: string,
  text: string,
  ott: string[],
  rating: number,
  movie_title: string,
  img_url: string,
  id: Number
) => {
  try {
    const oldImgUrl = await getMovieImgUrl(user_id)

    if (oldImgUrl) {
      const oldImgName = oldImgUrl.split('/').pop()
      await supabaseAdmin.storage
        .from('movieImage')
        .remove([`public/${oldImgName}`])
    }

    const { data, error } = await supabaseAdmin.from('reviews').upsert([
      {
        movie_id,
        user_id,
        text,
        ott,
        rating,
        movie_title,
        img_url,
        id
      }
    ])

    if (error) {
      console.error(`데이터 통신에 실패하였습니다..😵‍💫 ${error.message}`)
      throw error
    } else {
      console.log('Supabase 리뷰와 이미지 삽입 성공:', data)
    }
  } catch (error) {
    console.error(`데이터 통신에 실패하였습니다..😵‍💫 ${error}`)
    throw error
  }
}

//# 리뷰 삭제
const getMovieImgUrl = async (id: string): Promise<string | null> => {
  try {
    const { data, error } = await supabaseAdmin
      .from('reviews')
      .select('img_url')
      .eq('user_id', id)

    if (error) {
      console.error(`데이터 통신에 실패하였습니다..😵‍💫 ${error.message}`)
      return null
    } else {
      console.log('Supabase 이미지 가져오기 성공:', data)

      return data && data.length > 0 ? data[0].img_url : null
    }
  } catch (error) {
    console.error(`데이터 통신에 실패하였습니다..😵‍💫 ${error}`)
    return null
  }
}

export const deleteReview = async (id: string, user_id: string) => {
  const oldImgUrl = await getMovieImgUrl(user_id)

  if (oldImgUrl) {
    const oldImgName = oldImgUrl.split('/').pop()
    await supabaseAdmin.storage
      .from('movieImage')
      .remove([`public/${oldImgName}`])
  }

  const { data, error } = await supabaseAdmin
    .from('reviews')
    .delete()
    .eq('id', id)

  if (data) {
    return null
  } else {
    console.log(error)
    return null
  }
}

import { createClient } from '@supabase/supabase-js'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const supabase = createClient(
  `${import.meta.env.VITE_SUPABASE_URL}`,
  `${import.meta.env.VITE_SUPABASE_KEY}`
)

export const fetchAllLikes = async () => {
  const { data } = await supabase.from('likes').select('*')
  // return data
  console.log(data)
}

// export const matchLike = async (userId: string) => {
//   const { data } = await supabase
//     .from('likes')
//     .select()
//     .match({ likes_user_id: userId, user_id: userId })

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

export const deleteLikes = async (tutorId?: string) => {
  await supabase.from('bookmark').delete().match({ tutor_id: tutorId })
}

export const useCreateLikesMutation = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation(addLike, {
    onSuccess: () => {
      queryClient.invalidateQueries(['matchLike'])
    }
  })

  return mutation
}

export const useDeleteLikesMutation = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation(deleteLikes, {
    onSuccess: () => {
      queryClient.invalidateQueries(['matchLike'])
    }
  })

  return mutation
}

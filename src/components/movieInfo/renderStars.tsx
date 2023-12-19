import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

export const renderStars = (rating: string) => {
  const count = parseInt(rating, 10)
  if (isNaN(count) || count <= 0) {
    return null
  }

  const stars = []
  for (let i = 0; i < count; i++) {
    stars.push(
      <FontAwesomeIcon key={i} icon={faStar} style={{ color: '#FFC61A' }} />
    )
  }

  return stars
}

export default renderStars

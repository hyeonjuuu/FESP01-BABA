import { useEffect, useState } from 'react'
import styled from 'styled-components'
import yellowStar from '@/assets/StarIcon.svg'
import useThemeStore from '@/store/useThemeStore'
import whiteStar from '@/assets/WhiteStarIcon.svg'
import darkModeWhiteStar from '@/assets/DarkModeWhiteStar.svg'
import darkModeYellowStar from '@/assets/DarkModeYellowStar.svg'

interface StarRatingProps {
  onRatingChange: (newRating: number) => void
  initialRating?: number
}

interface StarIconProps {
  selected: boolean
  $darkMode: boolean
}

const StarRating = ({ onRatingChange, initialRating = 0 }: StarRatingProps) => {
  const { $darkMode } = useThemeStore()

  const [rating, setRating] = useState(initialRating)

  useEffect(() => {
    setRating(initialRating)
  }, [initialRating])

  const handleStarClick = (selectedRating: number) => {
    if (rating === selectedRating) {
      setRating(initialRating)
      onRatingChange(initialRating)
    } else {
      setRating(selectedRating)
      onRatingChange(selectedRating)
    }
  }

  return (
    <StarContainer>
      {[1, 2, 3, 4, 5].map(index => (
        <StarIcon
          key={index}
          onClick={() => handleStarClick(index)}
          selected={index <= rating}
          $darkMode={$darkMode}
        />
      ))}
    </StarContainer>
  )
}

export default StarRating

const StarContainer = styled.div`
  display: flex;
`

const StarIcon = styled.div<StarIconProps>`
  width: 22px;
  height: 22px;
  // 저장하면서 괄호 사라져서 에러나는 것...작동에는 문제없음
  background-image: url(${props =>
    props.selected
      ? props.$darkMode
        ? darkModeYellowStar
        : yellowStar
      : props.$darkMode
        ? darkModeWhiteStar
        : whiteStar});
  cursor: pointer;
  margin-right: 5px;
`

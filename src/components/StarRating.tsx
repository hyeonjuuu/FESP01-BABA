import { useState } from 'react'
import styled from 'styled-components'
import yellowStar from '@/assets/StarIcon.svg'
import useThemeStore from '@/store/useThemeStore'
import whiteStar from '@/assets/WhiteStarIcon.svg'
import darkModeWhiteStar from '@/assets/DarkModeWhiteStar.svg'
import darkModeYellowStar from '@/assets/DarkModeYellowStar.svg'

interface StarRatingProps {
  onRatingChange: (newRating: number) => void
}

interface StarIconProps {
  selected: boolean
  $darkMode: boolean
}

const StarRating = ({ onRatingChange }: StarRatingProps) => {
  const { $darkMode } = useThemeStore()

  const [rating, setRating] = useState(0)

  const handleStarClick = (selectedRating: number) => {
    if (rating === selectedRating) {
      setRating(0)
      onRatingChange(0)
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

// 스타일드 컴포넌트 오류???? 대체 무슨 오류지...
const StarIcon = styled.div<StarIconProps>`
  @media (min-width: 1031px) {
    flex-direction: column;
    width: 28px;
    height: 28px;
    margin: 0 7px;
  }

  width: 22px;
  height: 22px;
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
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.2);
  }
`

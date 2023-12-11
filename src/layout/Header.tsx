import styled from 'styled-components'
import useThemeStore from '../store/useThemeStore'
import DarkModeToggle from '@/components/DarkModeToggle'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'

interface HeaderDivProps {
  $darkMode: boolean
}

interface ArrowDivProps {
  $isHome: boolean
}

function Header({ isHome }: { isHome: boolean }) {
  const { $darkMode } = useThemeStore()
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <HeaderWrappderDiv>
      <HeaderDiv $darkMode={$darkMode}>
        <ArrowDiv $isHome={isHome} onClick={handleGoBack}>
          <StyledFontAwesomeIcon icon={faAngleLeft} />
        </ArrowDiv>
        <DarkModeToggle />
      </HeaderDiv>
    </HeaderWrappderDiv>
  )
}

export default Header

const HeaderWrappderDiv = styled.div`
  width: 100%;
  max-width: 370px;
  @media (min-width: 701px) {
    display: none;
  }
`

const HeaderDiv = styled.div<HeaderDivProps>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 2px solid black;
  border-color: ${({ $darkMode }) => ($darkMode ? '#FFFFFF' : 'black')};
`

const ArrowDiv = styled.div<ArrowDivProps>`
  visibility: ${({ $isHome }) => ($isHome ? 'hidden' : 'visible')};
  cursor: pointer;
`

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  font-size: 24px;
`

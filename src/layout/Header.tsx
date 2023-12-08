import styled from 'styled-components'
import useThemeStore from '../store/useThemeStore'
import DarkModeToggle from '@/components/DarkModeToggle'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface ArrowDivProps {
  darkMode: boolean
}

function Header() {
  const { darkMode } = useThemeStore()

  return (
    <HeaderDiv>
      <ArrowDiv darkMode={darkMode}>
        <FontAwesomeIcon icon={faAngleLeft} />
      </ArrowDiv>
      <DarkModeToggle />
    </HeaderDiv>
  )
}

export default Header

const HeaderDiv = styled.div`
  width: 100%;
  max-width: 370px;
`

const ArrowDiv = styled.div<ArrowDivProps>`
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 10px;
  border-bottom: 2px solid black;
  border-color: ${({ darkMode }) => (darkMode ? '#FFFFFF' : 'black')};
`

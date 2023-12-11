import styled from 'styled-components'
import useThemeStore from '../store/useThemeStore'

export interface FontProps {
  fontSize?: string
  fontWeight?: string
  $darkMode?: boolean
}

interface SizeProps {
  size?: string
  $darkMode: boolean
}

function CategoryComponent() {
  const { $darkMode } = useThemeStore()

  const categories = [
    { color: '#F56A1E', text: '액션' },
    { color: '#FFE100', text: '어드벤쳐', fontSize: '12px' },
    { color: '#3FD6A6', text: '애니메이션', fontSize: '11px' },
    { color: '#FF99AF', text: '코미디' },
    { color: '#DF461F', text: '범죄' },
    { color: '#496BF2', text: '다큐' },
    { color: '#77B1B9', text: '드라마' },
    { color: '#CEE319', text: '가족' },
    { color: '#69A7E7', text: '판타지' },
    { color: '#7B5F48', text: '역사' },
    { color: '#AD2625', text: '호러' },
    { color: '#A28CB7', text: '음악' },
    { color: '#177649', text: '미스테리' },
    { color: '#F4D6D4', text: '로맨스' },
    { color: '#513582', text: 'SF' },
    { color: '#F5E2A7', text: 'TV Movie', fontSize: '11px' },
    { color: '#F03F36', text: '스릴러' },
    { color: '#015097', text: '전쟁' }
  ]
  return (
    <CategorySection>
      <CategoryTitle>
        <SectionHeader size="62px" $darkMode={$darkMode}>
          카테고리
        </SectionHeader>
        <form action="#">
          <label htmlFor="영화/드라마" aria-label="선택하세요"></label>
          <SelectLabel name="languages" id="영화/드라마">
            <option value="영화">영화</option>
            <option value="드라마">드라마</option>
          </SelectLabel>
        </form>
      </CategoryTitle>
      <Category>
        {categories.map(({ color, text, fontSize }, index) => (
          <CategoryBox key={index}>
            <CategoryCircle color={color}></CategoryCircle>
            <CategroyList fontSize={fontSize} $darkMode={$darkMode}>
              {text}
            </CategroyList>
          </CategoryBox>
        ))}
      </Category>
    </CategorySection>
  )
}

export default CategoryComponent

const CategorySection = styled.section`
  margin: 36px 0 0 0;
`

const SectionHeader = styled.h2<SizeProps>`
  color: #303032;
  font-size: 16px;
  margin: 0;
  padding: 0;
  display: flex;
  flex-flow: column;
  align-items: flex-start;

  &:after {
    content: '';
    display: block;
    width: ${({ size }) => size};
    border-bottom: 5px solid #303032;
    border-color: ${({ $darkMode }) => ($darkMode ? '#FFFFFF' : '#303032')};
  }
`

const CategoryTitle = styled.div`
  display: flex;
  justify-content: space-between;
  flex-flow: row;
  align-content: center;
`

const SelectLabel = styled.select`
  border: none;
  font-family: GmarketSans;
  color: #28c7c7;
`
const CategoryBox = styled.li`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  padding: 4px;
`

const Category = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: row;
  padding: 0;
  margin-top: 14px;
  margin-bottom: 22px;
`
const CategroyList = styled.div<FontProps>`
  box-sizing: border-box;
  display: inline;
  text-align: center;
  color: ${({ $darkMode }) => ($darkMode ? '#E0E0E0' : '#444444')};
  font-weight: 300;
  font-size: ${props => (props.fontSize ? props.fontSize : '14px')};
`
const CategoryCircle = styled.div`
  height: 56px;
  width: 56px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  align-self: center;
  margin-bottom: 4px;
`

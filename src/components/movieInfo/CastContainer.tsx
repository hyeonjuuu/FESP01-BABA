import { getMovieCrew } from '@/api/tmdbDetailData'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CastInfo from '@/components/movieInfo/CastInfo'
import styled from 'styled-components'

function CastContainer() {
  const { id: movieID } = useParams()

  const [castData, setCastData] = useState<any[] | undefined>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMovieCrew(movieID as string)
        setCastData(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [movieID])

  return (
    <Contaiter>
      <Title>🎥 감독 및 출연 🎬</Title>
      <Wrapper>
        {castData?.map(info => (
          <CastInfo
            key={info.id}
            profile={info.profile_path}
            name={info.name}
            character={info.character}
          />
        ))}
      </Wrapper>
    </Contaiter>
  )
}

export default CastContainer

const Contaiter = styled.aside`
  display: flex;
  flex-direction: column;

  @media (max-width: 1030px) {
    display: none;
  }
`

const Title = styled.h5`
  font-size: 22px;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

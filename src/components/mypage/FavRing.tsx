import { HoverDiv, HoverLink, MovieTitleSpan } from '@/pages/MyPage'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'

interface FavRingProps {
  review: ReviewsProps
}

interface ImgProps {
  src: string | null
  alt: string
}

function FavRing({ review }: FavRingProps) {
  return (
    <Contain>
      <div>
        <Wrapper>
          <HoverLink to={`/detail/${review.id}`}>
            <StoryRing>
              <Img
                src={
                  review.img_url
                    ? `https://ufinqahbxsrpjbqmrvti.supabase.co/storage/v1/object/public/movieImage/${review.img_url}`
                    : `https://image.tmdb.org/t/p/original/${review.default_img?.replace(
                        'public/',
                        ''
                      )}`
                }
                alt={`${review.movie_title} 포스터`}
              />
              <HoverDiv>
                <MovieTitleSpan>
                  <FontAwesomeIcon icon={faHeart} /> {review.likes.length}
                </MovieTitleSpan>
              </HoverDiv>
            </StoryRing>
          </HoverLink>
        </Wrapper>
        <Title>{review.movie_title}</Title>
      </div>
    </Contain>
  )
}

export default FavRing

const Contain = styled.div`
  width: 60px;
  height: 78px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px 0;
  overflow: visible; // overflow를 visible로 설정합니다.
`

const Wrapper = styled.div`
  /* display: flex; */
`

const StoryRing = styled.div`
  position: relative;
  width: 72px;
  height: 72px;
  border: 3px solid transparent;
  border-radius: 50%;
  background-image: linear-gradient(#fff, #fff),
    linear-gradient(to right, red 0%, orange 100%);
  background-origin: border-box;
  background-clip: content-box, border-box;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    > img {
      filter: saturate(0%) brightness(40%);
      transition: 0.5s;
    }
    > div {
      color: white;
      visibility: visible;
    }
  }
`

const Img = styled.img<ImgProps>`
  background-color: teal;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  cursor: pointer;
`

const Title = styled.p`
  font-size: 12px;
  /* line-height: 14px; */
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`

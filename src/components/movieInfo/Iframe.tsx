import { useEffect } from 'react'
import styled from 'styled-components'

interface IfarmeProps {
  videoId?: string
}

function Iframe({ videoId }: IfarmeProps) {
  useEffect(() => {
    const receiveMessage = (event: MessageEvent) => {
      // 메시지를 수신하여 처리
      const {} = event
      // const { data } = event
      // console.log('Received message from iframe:', data)
    }

    // 이벤트 리스너 등록
    window.addEventListener('message', receiveMessage)

    // 컴포넌트가 언마운트될 때 이벤트 리스너 해제
    return () => {
      window.removeEventListener('message', receiveMessage)
    }
  }, [])

  const sendMessage = () => {
    // 동영상 ID를 메시지로 보냄
    window.parent.postMessage({ videoId }, '*')
  }

  return (
    <>
      <iframe
        id="ytplayer"
        // type="text/html"
        src={`https://www.youtube.com/embed/${videoId}`}
        allowFullScreen
        allow="autoplay"
        width={'400px'}
        height={'250px'}
        style={{ margin: '6px 11px' }}
      ></iframe>
      <HideBtn onClick={sendMessage}>Send Video ID</HideBtn>
    </>
  )
}

export default Iframe

const HideBtn = styled.button`
  display: none;
`

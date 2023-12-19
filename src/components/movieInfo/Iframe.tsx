interface IfarmeProps {
  videoId?: string
}

function Iframe({ videoId }: IfarmeProps) {
  return (
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
  )
}

export default Iframe

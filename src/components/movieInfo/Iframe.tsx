interface IfarmeProps {
  videoId: string
}

function Iframe({ videoId }: IfarmeProps) {
  return (
    <iframe
      id="ytplayer"
      // type="text/html"
      src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&disablekb=1&modestbranding=1`}
      allowFullScreen
      allow="autoplay"
      className="aspect-video w-full"
    ></iframe>
  )
}

export default Iframe

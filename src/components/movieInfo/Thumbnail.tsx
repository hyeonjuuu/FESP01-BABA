interface ThumbnailProps {
  title?: string
  thumbnails?: string
}

function Thumbnail({ title, thumbnails }: ThumbnailProps) {
  return (
    <img
      src={thumbnails}
      alt={title}
      className="mo:flex-shrink rounded-lg hover:rounded-none tb:aspect-video tb:object-cover pc:aspect-video pc:object-cover lgpc:aspect-video lgpc:object-cover"
      // onMouseOver={handleMouseOver}
      // onMouseOut={handleMouseOut}
    />
  )
}

export default Thumbnail

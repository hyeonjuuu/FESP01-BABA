import { faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function SearchResultBar() {
  return (
    <div>
      <div>사진</div>
      <span>#고양이</span>
      <button>
        <FontAwesomeIcon icon={faX} />
      </button>
    </div>
  )
}

export default SearchResultBar

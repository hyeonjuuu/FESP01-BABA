import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SearchResultBar from '@/components/search/SearchResultBar'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

function SearchPage() {
  return (
    <>
      <h3 aria-label="hidden">검색창</h3>
      <div>
        <span>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </span>
        <input type="search" placeholder="Search" />
      </div>
      <SearchResultBar />
    </>
  )
}

export default SearchPage

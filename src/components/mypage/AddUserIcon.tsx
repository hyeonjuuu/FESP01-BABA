import styled from 'styled-components'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function AddUserIcon() {
  return (
    <>
      <Warpper>
        <FontAwesomeIcon icon={faPlus} />
      </Warpper>
    </>
  )
}

export default AddUserIcon

const Warpper = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 2.5px solid rgba(0, 0, 0, 0.8);
  background-color: #29c7c8;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 19px;
`

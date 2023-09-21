import Spinner from 'react-bootstrap/Spinner'

function Loader({title}) {
  return (
    <div className='d-flex justify-content-center flex-column align-items-center mt-5 py-5'>
      <Spinner animation='grow' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
      <p className='text-center fs-5'>{title}</p>
    </div>
  )
}

export default Loader
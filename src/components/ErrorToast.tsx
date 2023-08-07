import { useState, useEffect, FC } from 'react'

interface ErrorToastProps {
  message: string
}

const ErrorToast: FC<ErrorToastProps> = ({ message }) => {
  const [show, setShow] = useState(true)

  useEffect(() => {
    setShow(true)
  }, [])

  return show ? (
    <div className='error-toast'>
      <p className='error-toast__message'>{message}</p>
      <button className='error-toast__close' onClick={() => setShow(false)}>
        X
      </button>
    </div>
  ) : null
}

export default ErrorToast

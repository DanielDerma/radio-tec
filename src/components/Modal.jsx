import { useEffect, useRef } from 'react'

function Modal({ onClick, children, onClose }) {
  const buttonRef = useRef(null)

  // Handle clicks outside of the button
  useEffect(() => {
    function handleClickOutside(event) {
      if (buttonRef.current && !buttonRef.current.contains(event.target)) {
        onClose()
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [buttonRef, onClose])

  return (
    <button
      className="fixed bottom-0 z-30 h-14 w-screen bg-gray-400 lg:right-8 lg:bottom-8 lg:h-52 lg:w-96"
      ref={buttonRef}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Modal

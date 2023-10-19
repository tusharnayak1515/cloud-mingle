import React from 'react'

const Modal = ({children, className}:any) => {
  return (
    <div
      className={className || `fixed inset-0 z-[500] bg-[#0000006f] transition-all duration-300`}
    >
        {children}
    </div>
  )
}

export default Modal;
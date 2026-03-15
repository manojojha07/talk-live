import React from 'react'
import toast from 'react-hot-toast'

const HomePage = () => {
  return (
    <div onClick={() => toast.success("clicked here")}>
      
      Hi' i am  Home Page
    </div>
  )
}

export default HomePage

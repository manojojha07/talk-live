import React from 'react'
import { Link } from 'react-router'

const NotFoundRoute = () => {
  return (
    <div className='w-screen h-screen bg-gray-500 flex items-center justify-center'>
      <div className="h-40  w-50 flex flex-col justify-center items-center">
        <h1 className="text-xl font-bold">Not Found Route</h1>
        <Link to='/' className='mt-3 text-blue-700 hover:underline'>
          Back to Home
        </Link>
      </div>
    </div>
  )
}

export default NotFoundRoute
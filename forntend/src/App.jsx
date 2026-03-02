import { SignIn, SignInButton } from '@clerk/clerk-react'
import React from 'react'

const App = () => {
  return (
    <div>
      <h1>Welcome to our web Application</h1>
      <SignInButton mode='modal'/>
    </div>
  )
}

export default App

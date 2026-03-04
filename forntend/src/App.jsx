import { SignedIn, SignedOut, SignIn, SignInButton, SignOutButton } from '@clerk/clerk-react'
import React from 'react'

const App = () => {
  return (
    <div>
      <h1>Welcome to our web Application</h1>
      <SignedOut>
        <SignInButton mode="modal">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Sign In
          </button>
        </SignInButton>
      </SignedOut>

      {/* Jab user login hai */}
      <SignedIn>
        <SignOutButton >
          <button className="bg-red-500 text-white px-4 py-2 rounded">
            Logout
          </button>
        </SignOutButton>
      </SignedIn>
    </div>
  )
}

export default App

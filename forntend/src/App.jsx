import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from "@clerk/clerk-react";
import React from 'react'

const App = () => {
  return (
    <div>
      <h1>Welcome to our web Application</h1>
          <SignedOut>
        <SignInButton mode="modal">
          <button>LogIn</button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <SignOutButton>
          <button>Logout</button>
        </SignOutButton>
        <UserButton />
      </SignedIn>
    
    </div>
  )
}

export default App

import { useUser } from "@clerk/clerk-react";
import React from 'react'
import { Navigate, Route, Routes } from "react-router";
import AboutPage from "./pages/AboutPage";
import NotFoundRoute from "./pages/NotFoundroute";
import HomePage from "./pages/HomePage";
import ProblemsPage from "./pages/ProblemPages";
import { Toaster } from "react-hot-toast";


const App = () => {

  const  { isSignedIn } = useUser();

  return (
    <>
    <Toaster />
    <Routes>
      <Route path="/" element={ < HomePage/>} />
      <Route path="/about" element={ < AboutPage/>} />
      <Route path="/problems" element={ isSignedIn ? < ProblemsPage/> : <Navigate to='/' /> } />


      <Route path="*" element={ < NotFoundRoute/>} />


    </Routes>
    </>
  )
}

export default App

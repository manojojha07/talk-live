import { useUser } from "@clerk/clerk-react";
import React from 'react'
import { Navigate, Route, Routes } from "react-router";
import AboutPage from "./pages/AboutPage";
import NotFoundRoute from "./pages/NotFoundroute";
import HomePage from "./pages/HomePage";
import ProblemsPage from "./pages/ProblemsPages";
import { Toaster } from "react-hot-toast";
import DashboardPage from "./pages/DashboardPage";
import ProblemPage from "./pages/ProblemPage";


const App = () => {

  const  { isSignedIn, isLoaded } = useUser();
  
//yhis willl gert rid the flicking effact
  if(!isLoaded) return null;

  return (
    <>
    <Toaster />
    <Routes>
      <Route path="/" element={ !isSignedIn ? < HomePage/> : <Navigate to={'/dashboard'} />} />
      
      <Route path="/dashboard" element={ isSignedIn ? < DashboardPage/> : <Navigate to={'/'} />} />

      <Route path="/problems" element={ isSignedIn ? < ProblemsPage/> : <Navigate to='/' /> } />
      <Route path="/problem/:id" element={ isSignedIn ? < ProblemPage/> : <Navigate to='/' /> } />


      <Route path="*" element={ < NotFoundRoute/>} />


    </Routes>
    </>
  )
}

export default App

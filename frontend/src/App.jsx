import  {Routes , Route , Navigate } from 'react-router-dom';
import Navbar from "./components/Navbar";
import SettingPage from "./pages/SettingPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import {useAuthStore } from "./store/useAuthStore.js";
import { useThemeStore } from './store/useThemeStore.js';
import { useEffect } from 'react';
import {Loader} from 'lucide-react'
import { Toaster } from "react-hot-toast";

function App() {

  const {authUser , checkAuth , isCheckingAuth } = useAuthStore();
  const {theme} = useThemeStore();



  useEffect(()=>{
    checkAuth();
  } , [checkAuth])




  if(isCheckingAuth && !authUser){
    return(
      <div className='flex items-center justify-center h-screen'>
        <Loader className='size-10 animate-spin'/>
      </div>
    )
  }

  return (
    <>

      <div data-theme={theme}>


        {/* navbar */}
        <Navbar/>

        {/* pages */}
        <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to="/" />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="/settings" element={<SettingPage />} />

        </Routes>


        <Toaster />


      </div>
    </>
  )
}

export default App

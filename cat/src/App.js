import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Onboarding from "./pages/Onboarding";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import {useState} from "react"

function App() {
  const [userSignedIn, setUserSignedIn] = useState(localStorage.getItem('username'))
  const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'))
  const [showModal, setShowModal] = useState(false)
  const [isSignUp, setIsSignUp] = useState(true)
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home
          userSignIn={userSignedIn}
          setUserSignedIn={setUserSignedIn}
          accessToken={accessToken}
          setAccessToken={setAccessToken}
          showModal={showModal}
          setShowModal={setShowModal}
          isSignUp={isSignUp}
          setIsSignUp={setIsSignUp}
        />} />
        <Route path="/dashboard" element={<Dashboard
        userSignIn={userSignedIn}
        setUserSignedIn={setUserSignedIn}
        accessToken={accessToken}
        setAccessToken={setAccessToken}
        showModal={showModal}
        setShowModal={setShowModal}
        isSignUp={isSignUp}
        setIsSignUp={setIsSignUp}
        />} />
        <Route path="/onboarding" element={<Onboarding
        userSignIn={userSignedIn}
        setUserSignedIn={setUserSignedIn}
        accessToken={accessToken}
        setAccessToken={setAccessToken}
        showModal={showModal}
        setShowModal={setShowModal}
        isSignUp={isSignUp}
        setIsSignUp={setIsSignUp}
        />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;


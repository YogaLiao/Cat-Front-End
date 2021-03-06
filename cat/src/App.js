import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Onboarding from "./pages/Onboarding";
import AddService from "./pages/AddService";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import {useState, useEffect} from "react"
import Result from "./pages/Result";
import ServiceDetail from "./pages/ServiceDetail";
import Footer from "./components/Footer"
import About from "./pages/About";

function App() {
  const [userSignedIn, setUserSignedIn] = useState(localStorage.getItem('user'))
  const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'))
  const [showModal, setShowModal] = useState(false)
  const [isSignUp, setIsSignUp] = useState(true)
  console.log(localStorage.getItem('user'))
  console.log(userSignedIn)
  useEffect(() => setUserSignedIn(localStorage.getItem('user')),[])

  return (
    <>
      
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
        <Route path="/add" element={<AddService
        userSignIn={userSignedIn}
        setUserSignedIn={setUserSignedIn}
        accessToken={accessToken}
        setAccessToken={setAccessToken}
        showModal={showModal}
        setShowModal={setShowModal}
        isSignUp={isSignUp}
        setIsSignUp={setIsSignUp}
        />} />
        <Route path="/results" element={<Result
        userSignIn={userSignedIn}
        setUserSignedIn={setUserSignedIn}
        accessToken={accessToken}
        setAccessToken={setAccessToken}
        showModal={showModal}
        setShowModal={setShowModal}
        isSignUp={isSignUp}
        setIsSignUp={setIsSignUp}
        />} />
        <Route path="/results/:id" element={<ServiceDetail
        userSignIn={userSignedIn}
        setUserSignedIn={setUserSignedIn}
        accessToken={accessToken}
        setAccessToken={setAccessToken}
        showModal={showModal}
        setShowModal={setShowModal}
        isSignUp={isSignUp}
        setIsSignUp={setIsSignUp}
          />}/>
          <Route path="/about" element={<About
            userSignIn={userSignedIn}
            setUserSignedIn={setUserSignedIn}
            accessToken={accessToken}
            setAccessToken={setAccessToken}
            showModal={showModal}
            setShowModal={setShowModal}
            isSignUp={isSignUp}
            setIsSignUp={setIsSignUp}
          />}/> 
    </Routes>
      </BrowserRouter>
      <Footer />
      </>
  );
}

export default App;


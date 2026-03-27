
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import Application from "./pages/Application";
import EditApplication from "./pages/EditApplication";
import Profile from "./pages/Profile";
import Footer from "./pages/Footer"; 

function App() {
  return (
    <><Toaster
  position="top-right"
  toastOptions={{
    style: {
      background: "#333",
      color: "#fff",
    },
  }}
/>
    <Router>

      <Navbar /> {/* 🔥 Always visible */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/add' element={<Application/>}/>
        <Route path='/edit' element={<EditApplication/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
      <Footer/>
    </Router></>
  );
}


export default App;
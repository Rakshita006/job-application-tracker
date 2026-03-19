import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/api.js";

export default function Navbar() {

  const [open,setOpen]=useState(false)
  const navigate=useNavigate()

  const token=localStorage.getItem('token')
  const [user, setUser] = useState(
  JSON.parse(localStorage.getItem("user"))
);
  
  
  const fetchProfile = async () => {
  try {
    const res = await API.get("/users/profile");
    setUser(res.data);
  } catch (error) {
    console.log(error); // 👈 ADD THIS

    // optional: auto logout if token invalid
    localStorage.removeItem("token");
  }
};

useEffect(() => {
  const handleStorageChange = () => {
    setUser(JSON.parse(localStorage.getItem("user")));
  };

  window.addEventListener("storage", handleStorageChange);

  return () => window.removeEventListener("storage", handleStorageChange);
}, []);

useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);
  
    useEffect(() => {
  if (token) {
    fetchProfile();
  }
}, [token]);

  const handleLogout=async()=>{
    localStorage.removeItem('token')
    toast.success('loggedout successfully')
    navigate('/register')
  }
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-900 text-white shadow-md">

      {/* RIGHT SIDE */}
      <div className="text-lg font-bold text-blue-400">
        JobTracker 🚀
      </div>

      
      {/* LEFT SIDE */}
      <div className="flex gap-6 text-sm font-medium">
        <Link to="/" className="hover:text-blue-400">Home</Link>
        <Link to="/dashboard" className="hover:text-blue-400">Dashboard</Link>
        <Link to="/add" className="hover:text-blue-400">Add Application</Link>
        
      </div>


      <div className="relative">
        {token ? (
          <>
            {/* 👤 AVATAR */}
            <div
              onClick={() => setOpen(!open)}
              className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-full cursor-pointer"
            >
              {user?.name?.charAt(0).toUpperCase()}
            </div>

            {/* 🔽 DROPDOWN */}
            {open && (
              <div className="absolute right-0 mt-2 w-40 bg-blue-500 shadow-lg rounded-md overflow-hidden">
                <button
                  onClick={() => navigate("/profile")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-600"
                >
                  Profile
                </button>

                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-600 text-red-500"
                >
                  Logout
                </button>
              </div>
              )}
          </>
        ) : (
          <button
            onClick={() => navigate("/register")}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Sign up
          </button>
        )}
      </div>

    </nav>
  );
}
import React, { useEffect, useState } from "react";
import API from "../api/api.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate=useNavigate()
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  const fetchProfile = async () => {
    try {
      const res = await API.get("/users/profile");
      setUser(res.data);
    } catch (error) {
      toast.error("could not fetch profile");
    }
  };

  useEffect(() => {
    if (user) {
      setForm({ name: user.name, email: user.email });
    }
  }, [user]);

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUpdate=async()=>{
    try {
      const res=await API.put('/users/profile',form)
      localStorage.setItem("user", JSON.stringify(res.data));
      toast.success('Profile updated')
      navigate('/dashboard')
    } catch (error) {
      console.log(error);
      
      toast.error('some problem is occuring while updating your profile')
    }
  }

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  return (
    <>
     
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 to-blue-50">

  {/* 🔥 CARD CONTAINER */}
  <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

    {/* 👤 HEADER */}
    <div className="flex flex-col items-center mb-6">
      <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 text-white text-2xl rounded-full shadow-md mb-2">
        {form.name?.charAt(0).toUpperCase()}
      </div>
      <h2 className="text-xl font-bold text-gray-800">Edit Profile</h2>
      <p className="text-sm text-gray-500">Update your details</p>
    </div>

    {/* 📝 FORM */}
    <div className="space-y-4">

      <input
        name="name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        placeholder="Your Name"
        className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none p-3 w-full rounded-lg transition"
      />

      <input
        name="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        placeholder="Your Email"
        className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none p-3 w-full rounded-lg transition"
      />

      {/* 🚀 BUTTON */}
      <button
        onClick={handleUpdate}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-semibold shadow-md hover:scale-[1.02] transition"
      >
        Update Profile 🚀
      </button>

    </div>

  </div>
</div>
    </>
  );
};

export default Profile;

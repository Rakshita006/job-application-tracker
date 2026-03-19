import React, { useEffect, useState } from "react";
import API from "../api/api.js";
import toast from "react-hot-toast";
import { CiSearch } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [search, setSearch] = useState("");
  const [application, setApplication] = useState([]);
  const navigate=useNavigate()

  const fetchApplication = async (req, res) => {
    try {
      const res = await API.get("/applications");
      setApplication(res.data);
    } catch (error) {
      toast.error("Failed to load applications");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApplication();
  }, []);

  const filteredApps = (application || []).filter((app) => {
    return (
      app.company.toLowerCase().includes(search.toLowerCase()) ||
      app.status.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleDelete = async (id) => {
    await API.delete(`/applications/${id}`);
    setApplication((prev) => prev.filter((app) => app._id !== id));
  };

  const handleEdit=async(app)=>{
    navigate('/edit',{state:app})
  }
  return (
    <div>
      {/* 🔥 HERO SECTION */}
      <div className="text-center mb-0 bg-blue-950 h-80">
        <h1 className="text-6xl font-bold mb-3 p-10">
          Track Your Job Applications
        </h1>
        <p className="text-gray-200 text-2xl p-10 pb-0">
          Stay organized. Never miss an opportunity.
        </p>
      </div>

      {/* search */}
      <div className="flex justify-center mb-8 bg-blue-950 h-20">
        <div className="relative w-full max-w-md ">
          {/* ICON */}
          <CiSearch className="absolute left-3 top-1/3 transform -translate-y-1/2 text-gray-200 text-xl" />

          {/* INPUT */}
          <input
            type="text"
            placeholder="Search by company or status..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-3 pl-10 w-full rounded-full shadow-sm focus:outline-none focus:ring-2 text-white focus:ring-blue-100"
          />
        </div>
      </div>

      <div className="grid gap-4 p-6">
        {filteredApps.length === 0 && (
          <p className="text-center text-gray-500">No applications found</p>
        )}
        {filteredApps.map((app) => (
          <div
            key={app._id}
            className="border p-4 rounded-2xl shadow-sm flex justify-between bg-blue-200 "
          >
            <div className="bg-blue-400 rounded-xl p-2 w-40 flex items-center justify-center">
              <h3 className="font-bold">{app.company}</h3>
            </div>
            <div className="bg-blue-400 rounded-xl p-2 w-40 flex items-center justify-center">
              <p>{app.role}</p>
            </div>
            <div className="bg-blue-400 rounded-xl p-2 w-40 flex items-center justify-center">
              <p className="text-sm text-gray-200">{app.status}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(app)}
                className="bg-gray-400 px-3 py-1 rounded-xl"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(app._id)}
                className="bg-gray-500 text-white px-3 py-1 rounded-xl"
              >
                <MdDelete />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

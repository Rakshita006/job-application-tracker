import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api.js";
import toast from "react-hot-toast";

const Application = () => {
  const [form, setForm] = useState({
    company: "",
    role: "",
    status: "Applied",
    dateApplied: "",
    notes: "",
    joblink: "",
  });

  const navigate = useNavigate();

  const handleChange = async (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("Submitting form:", form); 
    try {
     const res= await API.post("/applications", form);
      console.log(res.data);
      
      toast.success("application added");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      
      toast.error(error.response?.data?.message || "Error");
    }
  };
  return (
    <div className="h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-md rounded w-96"
      >
        <h2 className="text-xl font-bold mb-4">Add Application</h2>

        <input
          name="company"
          placeholder="Company"
          onChange={handleChange}
          className="border p-2 w-full mb-3"
        />

        <input
          name="role"
          placeholder="Role"
          onChange={handleChange}
          className="border p-2 w-full mb-3"
        />

        <select
          name="status"
          onChange={handleChange}
          className="border p-2 w-full mb-3"
        >
          <option>Applied</option>
          <option>Interview</option>
          <option>Rejected</option>
        </select>

        <input
          type="date"
          name="date"
          onChange={handleChange}
          className="border p-2 w-full mb-3"
        />

        <textarea
          type="text"
          name="notes"
          onChange={handleChange}
          className="border p-2 w-full mb-3"
          placeholder="Add you notes"
        />

        <input
          type="url"
          name="jobUrl"
          placeholder="Job URL"
          onChange={handleChange}
          className="border p-2 w-full mb-3"
        />

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 w-full">
          Add Application
        </button>
      </form>
    </div>
  );
};

export default Application;

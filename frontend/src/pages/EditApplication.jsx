import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import API from '../api/api.js'
import toast from 'react-hot-toast'

const EditApplication = () => {
  const {state}=useLocation()
  const navigate=useNavigate()

  const [form,setForm]=useState(state)

  const handleChange=(e)=>{
    setForm({...form,[e.target.name]:e.target.value})
  }

  const handleSubmit=async(e)=>{
    e.preventDefault()
    try {
      await API.put(`/applications/${form._id}`,form)

      toast.success('successfully updated')
      navigate('/dashboard')
    } catch (error) {
      toast.error('update failed')
      console.log(error);
      
    }
  }
  return (
    <div className="h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded w-96">
        <h2 className="text-xl font-bold mb-4">Edit Application</h2>

        <input name="company" value={form.company} onChange={handleChange} className="border p-2 w-full mb-3" />
        <input name="role" value={form.role} onChange={handleChange} className="border p-2 w-full mb-3" />

        <select name="status" value={form.status} onChange={handleChange} className="border p-2 w-full mb-3">
          <option>Applied</option>
          <option>Interview</option>
          <option>Rejected</option>
        </select>

        <input type='date' name="date" value={form.date} onChange={handleChange} className="border p-2 w-full mb-3" />

        <textarea name="notes" value={form.notes} onChange={handleChange}></textarea>

        <button className="bg-green-500 text-white px-4 py-2 w-full">
          Update
        </button>
      </form>
    </div>
  )
}

export default EditApplication
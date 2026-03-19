import React, { useEffect, useState } from 'react'
import API from '../api/api.js';
import StatCard from '../components/statsCard.jsx';
import ApplicationCard from '../components/ApplicationCard.jsx';

const Dashboard = () => {

  const [stats,setStats]=useState({});
  const [applications,setApplications]=useState([]);

  useEffect(()=>{
    fetchStats()
    fetchApplications()
  },[])

  const fetchStats=async()=>{
    try {
      const res=await API.get('/status/stats')
      setStats(res.data)
    } catch (error) {
      console.log(error);
    }
  }

  const fetchApplications=async()=>{
    try {
      const res=await API.get('/applications')
      setApplications(res.data)
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* 🔥 STATS CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

        <StatCard title="Applied" value={stats.Applied || 0} />
        <StatCard title="Interview" value={stats.Interview || 0} />
        <StatCard title="Rejected" value={stats.Rejected || 0} />
        <StatCard title="Total" value={stats.Total || 0} />

      </div>

      {/* 📋 APPLICATION LIST */}
      <div className="bg-white p-4 rounded shadow">

        <h2 className="text-xl font-semibold mb-4">Your Applications</h2>

        {applications.length === 0 ? (
          <p>No applications found</p>
        ) : (
          applications.map((app) => (
            <ApplicationCard key={app._id} app={app} />
          ))
        )}

      </div>

    </div>
    </>
  )
}

export default Dashboard
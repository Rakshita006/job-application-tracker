import { useState } from "react";
import API from "../api/api.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [state,setState]=useState('login')
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (state === "register") {
      await API.post("/users/register", form);

      toast.success("Registered successfully ");
      setState("login"); // switch to login after register
    } 
    
    else {
      const res = await API.post("/users/login", form);

      if (res.data.token) {
  localStorage.setItem("token", res.data.token);
  toast.success("Login successful 🚀");
  navigate("/dashboard");
} else {
  toast.error(res.data.message);
}
    }

  } catch (err) {
    toast.error(err.response?.data?.message || "Error");
  }
};
  return (
    <div className="h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded">
        <h2 className="text-xl font-bold mb-4">{state==='register'?'Register' : 'Login'}</h2>

        {state==='register' && <input name="name" placeholder="Name" onChange={handleChange} className="border p-2 w-full mb-3" />}
        <input name="email" placeholder="Email" onChange={handleChange} className="border p-2 w-full mb-3" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="border p-2 w-full mb-3" />


        {state === "register" ? (
                <p>
                    Already have account? <span onClick={() => setState("login")} className="text-blue-500 cursor-pointer">click here</span>
                </p>
            ) : (
                <p>
                    Create an account? <span onClick={() => setState("register")} className="text-blue-500 cursor-pointer">click here</span>
                </p>
            )}


        <button className="bg-blue-500 text-white px-4 py-2 w-full ">
          {state==='register'?'Register' : 'Login'}
        </button>
      </form>
    </div>
  );
}